'use server';

/**
 * @fileOverview A flow for generating personalized donation tips and encouragement messages.
 *
 * - generatePersonalizedTip - A function that generates personalized donation tips.
 * - PersonalizedTipInput - The input type for the generatePersonalizedTip function.
 * - PersonalizedTipOutput - The return type for the generatePersonalizedTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTipInputSchema = z.object({
  donationHistory: z
    .string()
    .describe('Summary of the user donation history.'),
  bloodType: z.string().describe('The blood type of the user.'),
});
export type PersonalizedTipInput = z.infer<typeof PersonalizedTipInputSchema>;

const PersonalizedTipOutputSchema = z.object({
  tip: z.string().describe('A personalized donation tip or encouragement message.'),
});
export type PersonalizedTipOutput = z.infer<typeof PersonalizedTipOutputSchema>;

export async function generatePersonalizedTip(
  input: PersonalizedTipInput
): Promise<PersonalizedTipOutput> {
  return personalizedTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTipPrompt',
  input: {schema: PersonalizedTipInputSchema},
  output: {schema: PersonalizedTipOutputSchema},
  prompt: `You are a helpful assistant designed to provide personalized tips and encouragement messages to blood donors.

  Based on the user's donation history and blood type, create a short, motivating message to encourage regular donations and provide relevant health information.

  Donation History: {{{donationHistory}}}
  Blood Type: {{{bloodType}}}

  Tip: `,
});

const personalizedTipFlow = ai.defineFlow(
  {
    name: 'personalizedTipFlow',
    inputSchema: PersonalizedTipInputSchema,
    outputSchema: PersonalizedTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
