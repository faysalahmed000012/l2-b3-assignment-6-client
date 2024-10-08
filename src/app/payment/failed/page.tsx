import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen ">
      <h1 className="text-6xl text-red-500 text-center mt-20 mb-3">
        Payment Failed
      </h1>
      <p className="text-center text-3xl mt-3">Please Try Again</p>
      <div className="flex items-center justify-center">
        <Link className="underline mt-3 text-orange-500" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default page;
