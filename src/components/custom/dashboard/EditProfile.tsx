import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";

const EditProfile = () => {
  return (
    <div>
      <div className="md:max-w-[1400px] mb-10 flex items-center justify-between">
        <h2 className="text-3xl">Profile Info:</h2>
        <Button>
          {" "}
          <FaRegEdit className="me-3" /> Edit Profile
        </Button>
      </div>
      <div className="md:max-w-[1300px] mx-auto p-10 border border-gray-200 rounded-2xl">
        <div className="md:flex items-center justify-start">
          <div className="flex-1 ">
            <Image
              src="https://github.com/shadcn.png"
              width={160}
              height={160}
              alt=""
              className=" rounded-full"
            />
          </div>
          <div className="mt-6 md:mt-0 flex-1">
            <label className="text-gray-600" htmlFor="">
              Name:
            </label>
            <p className="text-2xl">Faysal Ahmed</p>
          </div>
        </div>
        <div className="mt-6 md:flex items-center justify-evenly">
          <div className="flex-1">
            <label className="text-gray-600" htmlFor="">
              Email:
            </label>
            <p className="text-2xl">faysal.ahmed@gmail.com</p>
          </div>
          <div className="mt-6 md:mt-0 flex-1">
            <label className="text-gray-600" htmlFor="">
              Bio:
            </label>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur dicta necessitatibus consequuntur excepturi in pariatur
              illum provident autem laboriosam culpa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
