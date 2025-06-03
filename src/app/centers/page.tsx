"use client";

import { useState } from 'react';
import { DonationCenterCard } from '@/components/features/donation-center-card';
import { DonationCenterDetailsModal } from '@/components/modals/donation-center-details-modal';
import type { DonationCenter } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ListFilter, MapPin } from 'lucide-react';

// Mock donation center data
const mockCenters: DonationCenter[] = [
  { id: 'dc1', name: 'City Blood Bank Central', address: '123 Main St', city: 'Metropolis', postalCode: '10001', operatingHours: 'Mon-Fri: 9am-5pm, Sat: 10am-2pm', contactInfo: '555-0101' },
  { id: 'dc2', name: 'Red Gift Donation Center', address: '456 Oak Ave', city: 'Gotham', postalCode: '20002', operatingHours: 'Tue-Sat: 8am-4pm', contactInfo: '555-0202' },
  { id: 'dc3', name: 'Community Care Clinic', address: '789 Pine Ln', city: 'Metropolis', postalCode: '10005', operatingHours: 'Mon-Wed-Fri: 10am-6pm', contactInfo: '555-0303' },
  { id: 'dc4', name: 'Hopewell Donor Services', address: '101 River Rd', city: 'Star City', postalCode: '30003', operatingHours: 'Daily: 7am-7pm', contactInfo: '555-0404' },
];

export default function CentersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<DonationCenter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCenters = mockCenters.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (center: DonationCenter) => {
    setSelectedCenter(center);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCenter(null);
  };

  return (
    <div className="space-y-8 py-8">
      <header className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Nearby Donation Centers</h1>
        <p className="text-lg text-muted-foreground">
          Find a donation center near you and check their details.
        </p>
      </header>

      <div className="sticky top-[65px] z-10 bg-background/80 backdrop-blur-md py-4 px-2 -mx-2 rounded-md shadow">
        <div className="max-w-xl mx-auto flex gap-2 items-center">
          <MapPin className="text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, city, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button variant="outline" className="shrink-0">
            <ListFilter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      {filteredCenters.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCenters.map((center) => (
            <DonationCenterCard
              key={center.id}
              center={center}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-10">
          No donation centers found matching your search.
        </p>
      )}

      {selectedCenter && (
        <DonationCenterDetailsModal
          center={selectedCenter}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
