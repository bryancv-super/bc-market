import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function PageSection({
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "py-4",
        className
      )}
    >
      {children}
    </section>
  );
}