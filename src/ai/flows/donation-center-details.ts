'use server';

/**
 * @fileOverview Flow for retrieving details about a donation center.
 *
 * - getDonationCenterDetails - A function that retrieves details about a donation center.
 * - GetDonationCenterDetailsInput - The input type for the getDonationCenterDetails function.
 * - GetDonationCenterDetailsOutput - The return type for the getDonationCenterDetails function.
 */

import { defineFlow } from '@genkit-ai/flow';
import { googleAI } from '@genkit-ai/googleai';
import { ai } from '@genkit-ai/ai'; // ✅ Fix: Import `ai`
import { z } from 'zod';

const GetDonationCenterDetailsInputSchema = z.object({
  name: z.string().describe('The name of the donation center.'),
  address: z.string().describe('The address of the donation center.'),
});
export type GetDonationCenterDetailsInput = z.infer<typeof GetDonationCenterDetailsInputSchema>;

const GetDonationCenterDetailsOutputSchema = z.object({
  name: z.string().describe('The name of the donation center.'),
  address: z.string().describe('The address of the donation center.'),
  openingHours: z.string().describe('The opening hours of the donation center.'),
  contactInformation: z.string().describe('The contact information of the donation center.'),
});
export type GetDonationCenterDetailsOutput = z.infer<typeof GetDonationCenterDetailsOutputSchema>;

export async function getDonationCenterDetails(input: GetDonationCenterDetailsInput): Promise<GetDonationCenterDetailsOutput> {
  return getDonationCenterDetailsFlow(input);
}

const getDonationCenterDetailsPrompt = ai.definePrompt({
  name: 'getDonationCenterDetailsPrompt',
  input: {schema: GetDonationCenterDetailsInputSchema},
  output: {schema: GetDonationCenterDetailsOutputSchema},
  prompt: `You are an expert at finding information about donation centers.

  Given the name and address of a donation center, find the opening hours and contact information.

  Name: {{{name}}}
  Address: {{{address}}}
  `,
});

const getDonationCenterDetailsFlow = ai.defineFlow(
  {
    name: 'getDonationCenterDetailsFlow',
    inputSchema: GetDonationCenterDetailsInputSchema,
    outputSchema: GetDonationCenterDetailsOutputSchema,
  },
  async input => {
    const {output} = await getDonationCenterDetailsPrompt(input);
    return output!;
  }
);
