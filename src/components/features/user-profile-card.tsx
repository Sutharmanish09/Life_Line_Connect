import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";
import { Mail, MapPin, Phone, Droplet, Edit3 } from "lucide-react";

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="shadow-xl">
      <CardHeader className="items-center text-center">
        <Avatar className="w-24 h-24 mb-4 border-4 border-primary/50 shadow-md">
          <AvatarImage src={`https://placehold.co/100x100.png?text=${initials}`} alt={user.name} data-ai-hint="profile avatar" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl font-headline text-primary">{user.name}</CardTitle>
        <CardDescription className="text-md">Blood Donor</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="border-t border-b border-border/50 py-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Mail size={16} className="mr-3 text-primary" />
              <span className="text-foreground">{user.email}</span>
            </div>
            {user.contactNumber && (
              <div className="flex items-center">
                <Phone size={16} className="mr-3 text-primary" />
                <span className="text-foreground">{user.contactNumber}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-b border-border/50 py-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Donor Details</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Droplet size={16} className="mr-3 text-red-500" />
              <span className="text-foreground">Blood Type: <strong>{user.bloodType}</strong></span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-3 text-green-500" />
              <span className="text-foreground">Location: <strong>{user.location}</strong></span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline">
          <Edit3 size={16} className="mr-2" /> Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
