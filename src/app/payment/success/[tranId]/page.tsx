import Link from "next/link";

const page = ({ params }: { params: { tranId: string } }) => {
  return (
    <div className="min-h-screen ">
      <h1 className="text-6xl text-green-500 text-center mt-20 mb-3">
        Payment Success
      </h1>
      <p className="text-3xl text-center">Transaction Id : {params.tranId}</p>
      <div className="flex items-center justify-center">
        <Link className="underline mt-3 text-orange-500" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default page;
