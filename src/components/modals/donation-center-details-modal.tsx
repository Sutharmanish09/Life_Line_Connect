"use client";

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, MapPin, Clock, Phone, Info } from 'lucide-react';
import type { DonationCenter } from '@/types';
import { Alert, AlertTitle, AlertDescription as AlertDesc } from '@/components/ui/alert'; // Renamed AlertDescription

interface DonationCenterDetailsModalProps {
  center: DonationCenter | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DonationCenterDetailsModal({ center, isOpen, onClose }: DonationCenterDetailsModalProps) {
  const [details, setDetails] = useState<GetDonationCenterDetailsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (center && isOpen) {
      const fetchDetails = async () => {
        setIsLoading(true);
        setError(null);
        setDetails(null);
        try {
          const input: GetDonationCenterDetailsInput = {
            name: center.name,
            address: center.address,
          };
          const result = await getDonationCenterDetails(input);
          setDetails(result);
        } catch (err) {
          console.error("Error fetching donation center details:", err);
          setError("Could not load detailed information for this center. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    }
  }, [center, isOpen]);

  if (!center) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">{center.name}</DialogTitle>
          <DialogDescription className="flex items-center pt-1">
            <MapPin size={14} className="mr-1.5 text-muted-foreground" />
            {center.address}, {center.city}
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">Fetching details...</p>
          </div>
        )}

        {error && !isLoading && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDesc>{error}</AlertDesc>
          </Alert>
        )}

        {!isLoading && !error && details && (
          <div className="py-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-1 flex items-center">
                <Clock size={16} className="mr-2 text-primary" /> Operating Hours
              </h3>
              <p className="text-foreground">{details.openingHours || 'Not available'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-1 flex items-center">
                <Phone size={16} className="mr-2 text-primary" /> Contact Information
              </h3>
              <p className="text-foreground">{details.contactInformation || 'Not available'}</p>
            </div>
            {/* You can add more details here if the GenAI flow provides them */}
          </div>
        )}
        
        {!isLoading && !error && !details && (
           <div className="flex items-center justify-center h-40 flex-col">
            <Info size={24} className="text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No additional details found for this center.</p>
          </div>
        )}


        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
