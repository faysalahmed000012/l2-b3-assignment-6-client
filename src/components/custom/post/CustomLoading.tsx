import { Loader2 } from "lucide-react";

const CustomLoading = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
    </div>
  );
};

export default CustomLoading;
