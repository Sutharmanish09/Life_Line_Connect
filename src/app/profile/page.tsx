"use client"; // This page uses client-side hooks for AI interactions

import { UserProfileCard } from '@/components/features/user-profile-card';
import { PersonalizedTipsCard } from '@/components/features/personalized-tips-card';
import type { User } from '@/types';
import { Separator } from '@/components/ui/separator';

// Mock user data - replace with actual data fetching
const mockUser: User = {
  id: 'user1',
  name: 'Jane Donor',
  email: 'jane.donor@example.com',
  bloodType: 'O+',
  location: 'Austin, TX',
  contactNumber: '555-123-4567',
};

// Mock donation history summary - replace with actual data
const mockDonationHistorySummary = "Donated O+ blood 5 times in the last 2 years. Last donation was 3 months ago.";

export default function ProfilePage() {
  const user = mockUser; // In a real app, fetch user data

  return (
    <div className="space-y-8 py-8">
      <header className="text-center md:text-left">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">My Profile</h1>
        <p className="text-lg text-muted-foreground">
          Manage your donor information and get personalized insights.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <UserProfileCard user={user} />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <PersonalizedTipsCard 
            donationHistorySummary={mockDonationHistorySummary} 
            bloodType={user.bloodType} 
          />
          
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-headline text-primary mb-4">Donation Badges</h2>
            <p className="text-muted-foreground">Feature coming soon! Earn badges for your contributions.</p>
            {/* Placeholder for badges */}
            <div className="flex space-x-4 mt-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs">1st Don.</div>
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs">5x Donor</div>
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs">Lifesaver</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
