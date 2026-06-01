import { UserRound } from "lucide-react";

type UserSummaryCardProps = {
  name: string;
  email: string;
  profileImage?: string | null;
};

export function UserSummaryCard({ name, email, profileImage }: UserSummaryCardProps) {
  return (
    <article className="card-shadow rounded-2xl bg-surface px-5 py-8 text-center">
      {profileImage ? (
        <div
          aria-label=""
          className="mx-auto size-15 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${profileImage})` }}
        />
      ) : (
        <div className="mx-auto grid size-15 place-items-center rounded-full bg-border-muted text-text-primary">
          <UserRound className="size-10" />
        </div>
      )}
      <h2 className="mt-4 text-xl font-bold text-text-primary">{name}</h2>
      <p className="mt-2 text-sm text-text-secondary">{email}</p>
    </article>
  );
}
