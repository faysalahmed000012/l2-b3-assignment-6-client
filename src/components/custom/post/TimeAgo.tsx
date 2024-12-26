"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { formatTimeDifference } from "../../../../utils";

const TimeAgo = ({ time }: { time: Date }) => {
  const [timeAgo, setTimeAgo] = useState("");
  const date = new Date(time);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const formattedDate = `${day},${month} ${year}`;
  useEffect(() => {
    const updateTimeAgo = () => {
      setTimeAgo(formatTimeDifference(time));
    };

    updateTimeAgo();
    const timer = setInterval(updateTimeAgo, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [time]);
  return (
    <div className=" text-sm text-gray-500">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <Clock className="w-4 h-4 mr-1" />
              <span>{timeAgo}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="bg-white rounded-xl px-6 py-3">
              <p>{formattedDate}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TimeAgo;
