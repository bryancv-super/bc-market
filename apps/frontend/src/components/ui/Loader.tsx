import { LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Loader({
  size = "md",
  className,
}: LoaderProps) {
  return (
    <LoaderCircle
      className={cn(
        "animate-spin text-primary",

        size === "sm" && "h-4 w-4",
        size === "md" && "h-6 w-6",
        size === "lg" && "h-8 w-8",

        className
      )}
    />
  )
}