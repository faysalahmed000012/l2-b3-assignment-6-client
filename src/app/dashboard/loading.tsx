import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="rounded-lg bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
          {/* <h2 className="text-2xl font-semibold tracking-tight">Loading your content</h2>
          <p className="text-sm text-muted-foreground">Please wait while we prepare your experience.</p>
          <Progress value={33} className="w-64" /> */}
        </div>
      </div>
    </div>
  );
};

export default loading;
