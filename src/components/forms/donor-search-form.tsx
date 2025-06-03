"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bloodTypes, type BloodType } from "@/types";
import { SearchIcon } from "lucide-react";

const formSchema = z.object({
  bloodType: z.enum(bloodTypes, { required_error: "Blood type is required." }),
  location: z.string().min(2, "Location is required (e.g., City or Zip Code)."),
});

interface DonorSearchFormProps {
  onSearch: (values: z.infer<typeof formSchema>) => void;
}

export function DonorSearchForm({ onSearch }: DonorSearchFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)} className="p-6 bg-card rounded-lg shadow-lg space-y-6 md:flex md:items-end md:space-y-0 md:space-x-4">
        <FormField
          control={form.control}
          name="bloodType"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Blood Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Location (City / Zip Code)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., San Francisco or 94107" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
          <SearchIcon className="mr-2 h-4 w-4" /> Search Donors
        </Button>
      </form>
    </Form>
  );
}
