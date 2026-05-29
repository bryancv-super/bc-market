import { ReactNode } from "react";

type PageSectionProps = {
  title: string;
  children: ReactNode;
};

export function PageSection({ title, children }: PageSectionProps) {
  return (
    <section className="mt-10">
      <h1 className="text-center text-xl font-bold text-text-primary">{title}</h1>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}
