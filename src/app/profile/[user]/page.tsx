import Image from "next/image";

const Profile = () => {
  return (
    <div className="mt-[150px] mx-[80px]">
      <div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="https://github.com/shadcn.png"
            alt="user"
            width={160}
            height={160}
            className="rounded-full"
          />
          <h1 className="text-3xl mt-2 font-semibold">Misbahul Haq</h1>
          <p className="text-lg mt-1 text-gray-600 md:max-w-[50%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea veniam
            odio, officiis at modi quidem consequatur culpa eveniet pariatur aut
            minima adipisci voluptates eaque facilis corporis perspiciatis
            quibusdam, vel veritatis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
