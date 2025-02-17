import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Button>Click me</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </>
  );
}
