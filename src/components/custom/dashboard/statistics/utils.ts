import { IPost } from "@/types";

interface IParms {
  status: string;
  success: boolean;
  data: IPost[];
}

export const getMonthlyPosts = (data: IParms) => {
  const monthlyData = new Array(12).fill(0).map((_, index) => ({
    month: new Date(2024, index).toLocaleString("default", {
      month: "short",
    }),
    posts: 0,
  }));

  data?.data?.forEach((post) => {
    try {
      const postDate = new Date(post.createdAt);
      if (!isNaN(postDate.getTime())) {
        const monthIndex = postDate.getMonth();
        monthlyData[monthIndex].posts += 1;
      }
    } catch (error) {
      console.error("Error processing booking:", error);
    }
  });

  return monthlyData;
};

export const getYearlyPosts = (data: IParms) => {
  const currentYear = new Date().getFullYear();

  const startYear = currentYear - 4;

  const yearlyData = Array.from({ length: 5 }, (_, index) => ({
    year: (startYear + index).toString(),
    posts: 0,
  }));

  data?.data?.forEach((post) => {
    try {
      const postDate = new Date(post.createdAt);
      if (!isNaN(postDate.getTime())) {
        const postYear = postDate.getFullYear();
        const yearIndex = yearlyData.findIndex(
          (item) => item.year === postYear.toString()
        );

        // Only increment count if the year falls within our range
        if (yearIndex !== -1) {
          yearlyData[yearIndex].posts += 1;
        }
      }
    } catch (error) {
      console.error("Error processing post:", error);
    }
  });

  return yearlyData;
};
