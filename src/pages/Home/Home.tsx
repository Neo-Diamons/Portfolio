import TechnologiesUsed from "./TechnologiesUsed.tsx";
import MyProject from "@/pages/Home/MyProject.tsx";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <TechnologiesUsed />
      <MyProject />
    </div>
  );
}
