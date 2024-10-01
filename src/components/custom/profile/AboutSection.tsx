import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutSection({ bio }: { bio: string }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{bio}</p>
      </CardContent>
    </Card>
  );
}
