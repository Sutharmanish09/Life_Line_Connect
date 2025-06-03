import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";
import type { DonationCenter } from "@/types";

interface DonationCenterCardProps {
  center: DonationCenter;
  onViewDetails: (center: DonationCenter) => void;
}

export function DonationCenterCard({ center, onViewDetails }: DonationCenterCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">{center.name}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          <MapPin size={14} className="mr-1.5 text-muted-foreground" />
          {center.address}, {center.city}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        {center.operatingHours && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock size={14} className="mr-1.5" />
            <span>{center.operatingHours}</span>
          </div>
        )}
        {center.contactInfo && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone size={14} className="mr-1.5" />
            <span>{center.contactInfo}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onViewDetails(center)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
