"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  fallbackHref?: string;
  className?: string;
}

export function BackButton({
  fallbackHref,
  className,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    if (fallbackHref) {
      router.push(fallbackHref);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className={cn("shrink-0", className)}
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}