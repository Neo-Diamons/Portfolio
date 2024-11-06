import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator.tsx";
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
      <Separator />
      <main className="container max-w-screen-lg mx-auto pt-16 px-4">
        {children}
      </main>
    </div>
  );
}
