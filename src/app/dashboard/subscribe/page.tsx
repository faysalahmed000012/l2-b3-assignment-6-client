import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      <h1 className="text-3xl">Subscribe to my onlyfans ❤️❤️❤️</h1>
      <div className="mt-10 md:flex items-center justify-evenly">
        <div className="flex-1 max-w-[350px] h-[500px] border border-orange-500 rounded-xl p-3 relative">
          <h1 className="">Free Plan:</h1>
          <p className="text-4xl">$0.00</p>
          <hr className="my-3 h-0.5 border-t-0 bg-orange-500 bg-opacity-70" />
          <h2 className="text-lg">Benefits:</h2>
          <div className="ms-3 mt-6">
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Free posts</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Free posts</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Free posts</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Free posts</p>
            </div>
          </div>
          <div className=" flex items-center justify-center absolute bottom-6 left-5 right-5">
            <Button className="w-[90%] bg-orange-500">Subscribe</Button>
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex-1 max-w-[350px] h-[500px] border border-orange-500 rounded-xl p-3 relative">
          <h1 className="">Premium Plan:</h1>
          <p className="text-4xl">$5.00</p>
          <hr className="my-3 h-0.5 border-t-0 bg-orange-500 bg-opacity-70" />
          <h2 className="text-lg">Benefits:</h2>
          <div className="ms-3 mt-6">
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Free posts</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Free posts</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Free posts</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Free posts</p>
            </div>
          </div>
          <div className=" flex items-center justify-center absolute bottom-6 left-5 right-5">
            <Button className="w-[90%] bg-orange-500">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
