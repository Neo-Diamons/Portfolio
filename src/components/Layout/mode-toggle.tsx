import { ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/theme-provider";

interface Props {
  children?: ReactNode;
}

export function ModeToggle({
  children,
}: Props) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children
          ? (
            <Button
              className="bg-transparent border-none text-primary hover:bg-transparent flex items-center gap-2"
              variant="link"
            >
              <div className="flex items-center justify-center size-4">
                <Sun className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </div>
              {children}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )
          : (
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={children ? "middle" : "end"}>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
