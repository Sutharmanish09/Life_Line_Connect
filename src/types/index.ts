export interface User {
  id: string;
  name: string;
  email: string;
  bloodType: string;
  location: string; // e.g., City or Zip Code
  contactNumber?: string;
  // Add other relevant profile information
}

export interface DonationRecord {
  id: string;
  userId: string;
  date: string; // ISO string date
  location: string; // Name of donation center or hospital
  donationType: 'Whole Blood' | 'Platelets' | 'Plasma' | 'Power Red';
  notes?: string;
}

export interface DonationCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  latitude?: number; // For map integration
  longitude?: number; // For map integration
  operatingHours?: string; // Could be a structured object later
  contactInfo?: string;
}

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
