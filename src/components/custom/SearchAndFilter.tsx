import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

export function SearchAndFilter({ setSearchTerm, setTag, tag }) {
  const categories = [
    "All",
    "breakfast",
    "lunch",
    "dinner",
    "dessert",
    "snack",
    "vegan",
    "vegetarian",
    "gluten-free",
    "low-carb",
  ];

  const handleCategoryChange = (value) => {
    setTag(value);
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto">
      <form action="">
        <div className="md:flex items-center space-x-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              name="search"
              placeholder="Search recipes..."
              className="pl-10 pr-4 py-2 rounded-full"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <div className="mt-3 md:mt-0 flex md:flex md:items-center md:justify-center flex-row-reverse md:gap-3 items-center justify-between ">
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4"
            >
              Search
            </Button>
            <Select onValueChange={handleCategoryChange} value={tag}>
              <SelectTrigger className="w-[140px] rounded-full">
                <Filter className="mr-2" size={18} />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </div>
  );
}
