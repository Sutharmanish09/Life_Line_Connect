"use client";

import { useState } from 'react';
import { DonorSearchForm } from '@/components/forms/donor-search-form';
import { DonorCard } from '@/components/features/donor-card';
import type { User as DonorUser, BloodType } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search } from 'lucide-react';

// Mock donor data
const mockDonors: DonorUser[] = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', bloodType: 'A+', location: 'New York, NY', contactNumber: '123-456-7890' },
  { id: '2', name: 'Bob Johnson', email: 'bob@example.com', bloodType: 'O-', location: 'San Francisco, CA', contactNumber: '234-567-8901' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', bloodType: 'B+', location: 'New York, NY', contactNumber: '345-678-9012' },
  { id: '4', name: 'David Brown', email: 'david@example.com', bloodType: 'AB+', location: 'Chicago, IL', contactNumber: '456-789-0123' },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', bloodType: 'O-', location: 'San Francisco, CA', contactNumber: '567-890-1234' },
];

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<DonorUser[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (values: { bloodType: BloodType; location: string }) => {
    // Simulate API call / filtering
    const filteredDonors = mockDonors.filter(
      (donor) =>
        donor.bloodType === values.bloodType &&
        donor.location.toLowerCase().includes(values.location.toLowerCase())
    );
    setSearchResults(filteredDonors);
    setHasSearched(true);
  };

  return (
    <div className="space-y-8 py-8">
      <header className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Find Blood Donors</h1>
        <p className="text-lg text-muted-foreground">
          Search for available blood donors by blood type and location.
        </p>
      </header>

      <DonorSearchForm onSearch={handleSearch} />

      {hasSearched && (
        <section>
          <h2 className="text-2xl font-headline font-semibold mb-6 text-primary">
            Search Results ({searchResults.length})
          </h2>
          {searchResults.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((donor) => (
                <DonorCard key={donor.id} donor={donor} />
              ))}
            </div>
          ) : (
             <Alert className="border-yellow-500 text-yellow-700 bg-yellow-50 dark:border-yellow-400 dark:text-yellow-300 dark:bg-yellow-900/30">
              <Search className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <AlertTitle className="font-semibold text-yellow-700 dark:text-yellow-300">No Donors Found</AlertTitle>
              <AlertDescription>
                No donors matched your search criteria. Try broadening your search or checking back later.
              </AlertDescription>
            </Alert>
          )}
        </section>
      )}
       {!hasSearched && (
        <div className="text-center py-10">
          <Search size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Enter search criteria above to find donors.</p>
        </div>
      )}
    </div>
  );
}
