import { UserRound } from "lucide-react";

type UserSummaryCardProps = {
  name: string;
  email: string;
};

export function UserSummaryCard({ name, email }: UserSummaryCardProps) {
  return (
    <article className="card-shadow rounded-2xl bg-surface px-5 py-8 text-center">
      <div className="mx-auto grid size-[60px] place-items-center rounded-full bg-border-muted text-text-primary">
        <UserRound className="size-10" />
      </div>
      <h2 className="mt-4 text-xl font-bold text-text-primary">{name}</h2>
      <p className="mt-2 text-sm text-text-secondary">{email}</p>
    </article>
  );
}
