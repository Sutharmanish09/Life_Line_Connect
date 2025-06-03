"use client";

import { DonationHistoryTable } from '@/components/features/donation-history-table';
import type { DonationRecord } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

// Mock donation data
const mockDonationHistory: DonationRecord[] = [
  { id: '1', userId: 'user1', date: '2023-01-15', location: 'City General Hospital', donationType: 'Whole Blood', notes: 'Felt great afterwards!' },
  { id: '2', userId: 'user1', date: '2023-05-20', location: 'Red Cross Center Downtown', donationType: 'Platelets' },
  { id: '3', userId: 'user1', date: '2023-09-10', location: 'Community Blood Drive', donationType: 'Power Red', notes: 'Received a thank you card.' },
  { id: '4', userId: 'user1', date: '2024-02-01', location: 'City General Hospital', donationType: 'Plasma' },
];

export default function DonationsPage() {
  // In a real app, you'd fetch this data based on the logged-in user
  const donations = mockDonationHistory;

  return (
    <div className="space-y-8 py-8">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-headline font-bold text-primary mb-2">My Donation History</h1>
          <p className="text-lg text-muted-foreground">
            View and manage your past blood donations.
          </p>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/donations/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Donation
          </Link>
        </Button>
      </header>

      <DonationHistoryTable donations={donations} />
    </div>
  );
}
