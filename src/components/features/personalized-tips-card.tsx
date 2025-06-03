"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Lightbulb, Loader2 } from 'lucide-react';
import { generatePersonalizedTip, PersonalizedTipInput, PersonalizedTipOutput } from '@/ai/flows/personalized-donation-tips';
import { Alert, AlertTitle, AlertDescription as AlertDesc } from '@/components/ui/alert'; // Renamed to avoid conflict

interface PersonalizedTipsCardProps {
  // In a real app, these would come from user data
  donationHistorySummary: string;
  bloodType: string;
}

export function PersonalizedTipsCard({ donationHistorySummary, bloodType }: PersonalizedTipsCardProps) {
  const [tipData, setTipData] = useState<PersonalizedTipOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTip = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const input: PersonalizedTipInput = {
        donationHistory: donationHistorySummary,
        bloodType: bloodType,
      };
      const result = await generatePersonalizedTip(input);
      setTipData(result);
    } catch (err) {
      console.error("Error fetching personalized tip:", err);
      setError("Could not load a personalized tip at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTip();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationHistorySummary, bloodType]); // Re-fetch if these props change

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          <CardTitle className="text-xl font-headline text-accent">Personalized Tip</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchTip} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Refresh'}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center h-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Generating your tip...</p>
          </div>
        )}
        {error && !isLoading && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDesc>{error}</AlertDesc>
          </Alert>
        )}
        {!isLoading && !error && tipData && (
          <p className="text-sm text-foreground leading-relaxed">
            {tipData.tip}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
