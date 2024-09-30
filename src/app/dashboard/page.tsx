import { HiOutlineUserGroup } from "react-icons/hi2";

const page = () => {
  return (
    <div className="ms-10 mt-[70px]">
      <h1 className="text-3xl md:text-5xl">Hello, Faysal</h1>
      <p className="text-gray-600 text-lg">24,September 2024</p>
      <div className="flex items-center justify-start gap-6">
        <p className="text-lg flex items-center justify-start gap-3 px-1 py-1 rounded-xl hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
          {" "}
          <HiOutlineUserGroup /> followers 69
        </p>
        <p className="text-lg flex items-center justify-start gap-3 px-1 py-1 rounded-xl hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
          {" "}
          <HiOutlineUserGroup /> following 69
        </p>
      </div>

      <hr className="my-3 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10" />
      <div className="mt-10"></div>
    </div>
  );
};

export default page;
