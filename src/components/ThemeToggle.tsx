
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 transition-all duration-200 hover:bg-accent"
      title="Light mode"
      disabled
    >
      <Sun className="h-4 w-4" />
      <span className="sr-only">Light mode</span>
    </Button>
  );
}
