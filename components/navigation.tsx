import Link from "next/link";
import { Button } from "./ui/button";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center max-w-7xl mx-auto">
        <div className="w-full mr-4 flex justify-between">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Learning Center</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#about-us"
              className="transition-colors hover:text-foreground/80"
            >
              About US
            </Link>
            <Link
              href="#features"
              className="transition-colors hover:text-foreground/80"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="transition-colors hover:text-foreground/80"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="transition-colors hover:text-foreground/80"
            >
              FAQ
            </Link>
          </nav>
            <Link
              href="#contact"
              className="transition-colors hover:text-foreground/80"
            >
              <Button>Contact</Button>
            </Link>
        </div>
      </div>
    </header>
  );
}