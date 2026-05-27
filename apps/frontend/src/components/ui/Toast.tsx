"use client"

import { Toaster } from "sonner"

export function Toast() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
    />
  )
}