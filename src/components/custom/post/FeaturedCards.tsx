// FeaturedCards.js
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChefHat, TrendingUp } from "lucide-react";
import Link from "next/link";

export const FeaturedCards = () => (
  <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
    <Card className="bg-gradient-to-br from-orange-100 to-orange-200 shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-semibold flex items-center">
          <ChefHat className="mr-2" /> Featured Chef
        </h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>FC</AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/profile/faysal000012@gmail.com`}
              className="text-lg font-semibold"
            >
              Misbahul Haq
            </Link>
            <p className="text-sm text-gray-600">
              Master of International Cuisine
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card className="bg-gradient-to-br from-green-100 to-green-200 shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-semibold flex items-center">
          <TrendingUp className="mr-2" /> Trending Recipe
        </h3>
      </CardHeader>
      <CardContent>
        <h4 className="text-lg font-semibold">Avocado Toast Supreme</h4>
        <p className="text-sm text-gray-600">
          A healthy breakfast with a twist!
        </p>
      </CardContent>
    </Card>
    <Card className="bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-semibold">Cooking Tip of the Day</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          Always let your meat rest after cooking to retain its juices and
          flavor.
        </p>
      </CardContent>
    </Card>
  </motion.div>
);
