import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useIsMobile } from "@/hooks/use-mobile.tsx";
// @deno-types="@/vite-env.d.ts"
import Profile from "@/assets/profile-little.webp";

function HeaderDesktop() {
  return (
    <header className="flex justify-between gap-4 px-4 h-16">
      <div className="flex items-center h-full gap-4">
        <Avatar className="rounded-none h-8 w-8">
          <AvatarImage src={Profile} alt="Profile picture" />
          <AvatarFallback className="rounded-none">RH</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold">Romain HURÉ</h1>
      </div>
      <div className="flex items-center h-full gap-4">
        <a
          href="https://github.com/Neo-Diamons"
          target="_blank"
          aria-label="GitHub"
          rel="noopener noreferrer"
        >
          <Github className="h-6 w-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/romain-hur%C3%A9/"
          target="_blank"
          aria-label="LinkedIn"
          rel="noopener noreferrer"
        >
          <Linkedin className="h-6 w-6" />
        </a>
        <a href="mailto:romain.hure@epitech.eu" aria-label="Email">
          <Mail className="h-6 w-6" />
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}

function HeaderMobile() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 h-16">
      <div className="flex items-center h-full gap-4">
        <Avatar className="rounded-none h-8 w-8">
          <AvatarImage src={Profile} alt="Profile picture" />
          <AvatarFallback className="rounded-none">RH</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold">Romain HURÉ</h1>
      </div>
      <div className="flex items-center h-full gap-4">
        <Button variant="icon" onClick={() => setIsOpened(!isOpened)}>
          <Menu className="!h-6 !w-6" />
        </Button>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-background transition-opacity duration-300 ${
          isOpened ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <Button asChild variant="link">
            <a
              href="https://github.com/Neo-Diamons"
              target="_blank"
              aria-label="GitHub"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github /> GitHub
            </a>
          </Button>
          <Button asChild variant="link">
            <a
              href="https://www.linkedin.com/in/romain-hur%C3%A9/"
              target="_blank"
              aria-label="LinkedIn"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin /> LinkedIn
            </a>
          </Button>
          <Button asChild variant="link">
            <a
              href="mailto:romain.hure@epitech.eu"
              aria-label="Email"
              className="flex items-center gap-2"
            >
              <Mail /> Email
            </a>
          </Button>
          <ModeToggle>Theme</ModeToggle>
          <Button variant="link" onClick={() => setIsOpened(false)}>
            <X /> Close
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  const isMobile = useIsMobile();

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}
