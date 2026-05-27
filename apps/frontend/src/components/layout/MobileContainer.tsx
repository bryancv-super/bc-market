interface Props {
    children: React.ReactNode;
  }
  
  export function MobileContainer({ children }: Props) {
    return (
      <main
        className="
          mx-auto
          min-h-screen
          w-full
          max-w-97.5
          px-4
        "
      >
        {children}
      </main>
    );
  }