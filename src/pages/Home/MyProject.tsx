import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import MagneticCard from "@/components/MagneticCard/MagneticCard.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Package } from "lucide-react";
import repositories from "@/assets/repositories.json";

export default function MyProject() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <Package className="size-8" />
        <h2 className="text-2xl font-bold">
          My project
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {repositories.map((data, index) => (
          <MagneticCard key={index} className="flex justify-between flex-col">
            <a href={data.url} target="_blank" rel="noreferrer">
              <div>
                <CardHeader>
                  <CardTitle>{data.name}</CardTitle>
                  <CardDescription className="flex flex-row gap-1">
                    {data.topics.map((topic, index) => (
                      <Badge
                        key={index}
                        className="bg-blue-600 hover:bg-blue-950 bg-opacity-30 text-blue-600"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </CardDescription>
                </CardHeader>
                <CardContent>{data.description}</CardContent>
              </div>
              <CardFooter className="text-small opacity-50">
                Last update:{" "}
                {new Date(data.lastUpdate).toLocaleDateString("en-US")}
              </CardFooter>
            </a>
          </MagneticCard>
        ))}
      </div>
    </div>
  );
}
