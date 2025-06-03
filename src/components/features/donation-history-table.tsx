"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { DonationRecord } from "@/types";
import { format } from 'date-fns';
import { CalendarDays, MapPin, Droplets, Info } from "lucide-react";

interface DonationHistoryTableProps {
  donations: DonationRecord[];
}

export function DonationHistoryTable({ donations }: DonationHistoryTableProps) {
  if (donations.length === 0) {
    return <p className="text-muted-foreground text-center py-8">You have no donation history yet.</p>;
  }

  return (
    <div className="rounded-lg border shadow-md overflow-hidden bg-card">
      <Table>
        <TableCaption className="py-4">A list of your past blood donations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} /> Date
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> Location
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Droplets size={16} /> Type
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Info size={16} /> Notes
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map((donation) => (
            <TableRow key={donation.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">
                {format(new Date(donation.date), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell>{donation.location}</TableCell>
              <TableCell>
                <Badge variant={
                  donation.donationType === 'Whole Blood' ? 'default' :
                  donation.donationType === 'Platelets' ? 'secondary' :
                  donation.donationType === 'Plasma' ? 'outline' : // Needs styling for accent variant
                  'destructive' // Power Red
                }
                className={
                  donation.donationType === 'Plasma' ? 'border-accent text-accent' : 
                  donation.donationType === 'Power Red' ? 'bg-red-500 text-white' : ''
                }
                >
                  {donation.donationType}
                </Badge>
              </TableCell>
              <TableCell>{donation.notes || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
