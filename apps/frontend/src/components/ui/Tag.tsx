import { cn } from "@/lib/utils"

interface TagProps {
  children: React.ReactNode
  variant?: "default" | "active" | "outline"
  size?: "sm" | "md"
  className?: string
}

export function Tag({
  children,
  variant = "default",
  size = "md",
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-colors",
        
        // Sizes
        size === "sm" && "px-2 py-1 text-xs",
        size === "md" && "px-3 py-1.5 text-sm",

        // Variants
        variant === "default" &&
          "bg-muted text-muted-foreground",

        variant === "active" &&
          "bg-primary text-primary-foreground",

        variant === "outline" &&
          "border border-border bg-transparent text-foreground",

        className
      )}
    >
      {children}
    </span>
  )
}