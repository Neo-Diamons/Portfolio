import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotFound({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
      {...props}
    >
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-xl">Page not found</p>
      <Button className="mt-4" asChild>
        <NavLink to="/">
          <House className="h-4 w-4 mr-2" />
          Go back home
        </NavLink>
      </Button>
    </div>
  );
}
