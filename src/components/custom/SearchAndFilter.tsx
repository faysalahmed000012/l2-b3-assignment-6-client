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
import { useState } from "react";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
}

export function SearchAndFilter({ onSearch, onFilter }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto">
      <div className="md:flex items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <div className="mt-3 md:mt-0 flex md:flex md:items-center md:justify-center flex-row-reverse md:gap-3 items-center justify-between ">
          <Button
            onClick={handleSearch}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4"
          >
            Search
          </Button>
          <Select onValueChange={onFilter}>
            <SelectTrigger className="w-[140px] rounded-full">
              <Filter className="mr-2" size={18} />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="main-course">Main Course</SelectItem>
              <SelectItem value="dessert">Dessert</SelectItem>
              <SelectItem value="appetizer">Appetizer</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
