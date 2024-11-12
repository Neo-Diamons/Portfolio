import { Hammer } from "lucide-react";
// @deno-types="@/vite-env.d.ts"
import Bash from "@/assets/svg/languages/bash.svg";
// @deno-types="@/vite-env.d.ts"
import C from "@/assets/svg/languages/c.svg";
// @deno-types="@/vite-env.d.ts"
import Cpp from "@/assets/svg/languages/cpp.svg";
// @deno-types="@/vite-env.d.ts"
import CSS from "@/assets/svg/languages/css.svg";
// @deno-types="@/vite-env.d.ts"
import HTML from "@/assets/svg/languages/html.svg";
// @deno-types="@/vite-env.d.ts"
import Javascript from "@/assets/svg/languages/javascript.svg";
// @deno-types="@/vite-env.d.ts"
import Python from "@/assets/svg/languages/python.svg";
// @deno-types="@/vite-env.d.ts"
import TypeScript from "@/assets/svg/languages/typescript.svg";
// @deno-types="@/vite-env.d.ts"
import React from "@/assets/svg/frameworks/react.svg";
// @deno-types="@/vite-env.d.ts"
import Svelte from "@/assets/svg/frameworks/svelte.svg";
// @deno-types="@/vite-env.d.ts"
import TailwindCSS from "@/assets/svg/frameworks/tailwindcss.svg";
// @deno-types="@/vite-env.d.ts"
import NestJS from "@/assets/svg/frameworks/nestjs.svg";
// @deno-types="@/vite-env.d.ts"
import Docker from "@/assets/svg/devops/docker.svg";
// @deno-types="@/vite-env.d.ts"
import GitHubActions from "@/assets/svg/devops/github-actions.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data: {
  [key: string]: { name: string; icon: string }[];
} = {
  language: [
    { name: "C", icon: C },
    { name: "C++", icon: Cpp },
    { name: "Bash", icon: Bash },
    { name: "Python", icon: Python },
    { name: "HTML", icon: HTML },
    { name: "CSS", icon: CSS },
    { name: "JavaScript", icon: Javascript },
    { name: "TypeScript", icon: TypeScript },
  ],
  frameworks: [
    { name: "React", icon: React },
    { name: "Svelte", icon: Svelte },
    { name: "TailwindCSS", icon: TailwindCSS },
    { name: "NestJS", icon: NestJS },
  ],
  devops: [
    { name: "Docker", icon: Docker },
    { name: "GitHub Actions", icon: GitHubActions },
  ],
};

function displayData(key: string) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {data[key].map((data, index) => (
        <div key={index} className="flex flex-row items-center gap-2">
          <img src={data.icon} alt="TypeScript" className="w-8 h-8" />
          <h3 className="text-lg font-bold">{data.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default function TechnologiesUsed() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <Hammer className="size-8" />
        <h2 className="text-2xl font-bold">
          Technologies used
        </h2>
      </div>
      <Tabs defaultValue="language">
        <TabsList>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="devops">DevOps</TabsTrigger>
        </TabsList>
        <TabsContent value="language">
          {displayData("language")}
        </TabsContent>
        <TabsContent value="frameworks">
          {displayData("frameworks")}
        </TabsContent>
        <TabsContent value="devops">
          {displayData("devops")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
