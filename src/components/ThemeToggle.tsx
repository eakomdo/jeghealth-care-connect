
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
      <span className="sr-only">Light mode</span>
    </Button>
  );
}
