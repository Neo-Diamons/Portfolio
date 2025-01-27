import { ReactNode } from "react";
import { cn } from "@/lib/utils.ts";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern.tsx";
import Header from "./Header.tsx";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <div className="container max-w-screen-lg mx-auto md:p-8">
      <Header />
      <main className="container max-w-screen-lg mx-auto pt-16 px-4">
        {children}
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "fixed -z-10 inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
      </main>
    </div>
  );
}
