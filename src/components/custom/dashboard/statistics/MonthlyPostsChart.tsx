"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function MonthlyPostsChart({ data }) {
  return (
    <ChartContainer
      config={{
        posts: {
          label: "Posts",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[300px] sm:h-[400px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={8}
            tickSize={0}
            axisLine={false}
            tickFormatter={(value) => value.substring(0, 3)}
          />
          <YAxis
            stroke="#888888"
            fontSize={8}
            tickSize={0}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            width={30}
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <Bar
            dataKey="posts"
            fill="var(--color-posts)"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
