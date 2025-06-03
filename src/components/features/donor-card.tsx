import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Droplet, MapPin, Phone } from "lucide-react";
import type { User as DonorUser } from "@/types"; // Assuming User type can represent a donor

interface DonorCardProps {
  donor: DonorUser;
}

export function DonorCard({ donor }: DonorCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <User size={24} className="text-primary" />
          </div>
          <CardTitle className="font-headline text-xl text-primary">{donor.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Droplet size={16} className="mr-2 text-red-500" />
          Blood Type: <span className="font-semibold text-foreground ml-1">{donor.bloodType}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin size={16} className="mr-2 text-green-500" />
          Location: <span className="font-semibold text-foreground ml-1">{donor.location}</span>
        </div>
        {donor.contactNumber && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone size={16} className="mr-2 text-blue-500" />
            Contact: <span className="font-semibold text-foreground ml-1">{donor.contactNumber}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Request Contact
        </Button>
      </CardFooter>
    </Card>
  );
}
