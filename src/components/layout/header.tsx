// src/components/layout/header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplet, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Find Donors' },
  { href: '/centers', label: 'Donation Centers' },
  { href: '/donations', label: 'My Donations' },
  { href: '/profile', label: 'My Profile' },
];

// Mock auth status
const useAuth = () => ({ isAuthenticated: false, user: null });


export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-primary-foreground hover:opacity-90 transition-opacity">
          <Droplet size={32} />
          <h1 className="text-2xl font-headline font-bold">Lifeline Connect</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild
              className={cn(
                "text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground",
                pathname === item.href && "bg-primary/70 font-semibold"
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          {isAuthenticated ? (
            <Button variant="secondary">Logout</Button>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="default" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                <Menu size={24} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <Link href="/" className="flex items-center space-x-2 text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    <Droplet size={28} />
                    <h1 className="text-xl font-headline font-bold">Lifeline Connect</h1>
                  </Link>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start text-left"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  ))}
                </nav>
                <div className="p-4 border-t space-y-2">
                {isAuthenticated ? (
                  <Button variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>Logout</Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button variant="default" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/register">Register</Link>
                    </Button>
                  </>
                )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
