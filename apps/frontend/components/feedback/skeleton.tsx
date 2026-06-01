import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-xl bg-text-secondary/80", className)} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-surface p-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-4 h-4 w-52" />
      <Skeleton className="mt-3 h-4 w-24" />
    </div>
  );
}
