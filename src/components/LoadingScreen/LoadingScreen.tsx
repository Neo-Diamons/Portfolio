import { ReloadIcon } from "@radix-ui/react-icons";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-12rem-1px)] cursor-wait">
      <ReloadIcon className="h-10 w-10 animate-spin" />
    </div>
  );
}
