"use client"

import {
  Toaster as SonnerToaster,
  toast as sonnerToast
} from "sonner"

export function Toaster() {
  return <SonnerToaster />
}

export const toast = sonnerToast
