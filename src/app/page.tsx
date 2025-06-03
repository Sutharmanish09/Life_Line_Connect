import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, HeartHandshake, Search, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 rounded-lg shadow-lg bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <Droplet className="mx-auto mb-6 text-primary" size={72} strokeWidth={1.5} />
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6">
            Welcome to Lifeline Connect
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Your trusted platform to find blood donors, register to save lives, track your donations, and get personalized insights.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md transition-transform hover:scale-105">
              <Link href="/register">Register as a Donor</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-md transition-transform hover:scale-105">
              <Link href="/search">Find a Donor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-headline font-semibold text-center mb-10 text-primary">
          How Lifeline Connect Helps
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-accent/20 rounded-full mb-3">
                <Users size={36} className="text-accent" />
              </div>
              <CardTitle className="font-headline text-xl">Donor Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Easily create your donor profile and become a part of our life-saving community. Your information is kept secure.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/20 rounded-full mb-3">
                <Search size={36} className="text-primary" />
              </div>
              <CardTitle className="font-headline text-xl">Find Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Quickly search for compatible blood donors in your area based on blood type and location when in need.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-red-500/20 rounded-full mb-3">
                 <HeartHandshake size={36} className="text-red-600" />
              </div>
              <CardTitle className="font-headline text-xl">Track Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Keep a record of your noble contributions, view your donation history, and earn rewards for your generosity.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-secondary/50 rounded-lg shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-semibold mb-6 text-secondary-foreground">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of volunteers and recipients. Your single act of kindness can save multiple lives.
          </p>
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-transform hover:scale-105">
            <Link href="/register">Join Lifeline Connect Today</Link>
          </Button>
        </div>
      </section>
      
      {/* Placeholder for image */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-headline font-semibold text-center mb-10 text-primary">
                The Impact of Your Donation
            </h2>
            <Image 
                src="/LifeLine.png" 
                alt="Lifeline Connect Banner" 
                className="w-full h-auto rounded-xl shadow-md" 
                width={1200}
                height={400}
            />
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
                Blood transfusions are critical for various medical treatments, including surgeries, cancer therapy, chronic illnesses, and traumatic injuries. By donating blood, you contribute to a stable and safe blood supply for your community.
            </p>
        </div>
      </section>
    </div>
  );
}
