import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllPosts } from "@/hooks/post.hooks";
import { useState } from "react";
import CustomLoading from "../../post/CustomLoading";
import { MonthlyPostsChart } from "./MonthlyPostsChart";
import { getMonthlyPosts, getYearlyPosts } from "./utils";
import { YearlyPostsChart } from "./YearlyPostsChart";

const TotalPostsStats = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const { data, isLoading } = useGetAllPosts();

  const monthlyPosts = getMonthlyPosts(data);
  const yearlyPosts = getYearlyPosts(data);
  console.log(yearlyPosts);
  if (isLoading) {
    return <CustomLoading />;
  }

  return (
    <div className="container max-w-7xl lg:ms-6 mb-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Post Analytics
          </CardTitle>
          <CardDescription>View your website's post statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full lg:w-1/4 grid-cols-2">
              <TabsTrigger value="monthly">Monthly Posts</TabsTrigger>
              <TabsTrigger value="yearly">Yearly Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="space-y-4">
              <MonthlyPostsChart data={monthlyPosts} />
            </TabsContent>
            <TabsContent value="yearly" className="space-y-4">
              <YearlyPostsChart data={yearlyPosts} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalPostsStats;
