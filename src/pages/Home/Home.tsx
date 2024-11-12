import TechnologiesUsed from "./TechnologiesUsed.tsx";
import MyProject from "./Notableprojects.tsx";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <TechnologiesUsed />
      <MyProject />
    </div>
  );
}
