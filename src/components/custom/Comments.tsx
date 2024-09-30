import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const Comments = () => {
  const arr1 = new Array(4).fill("*");
  return (
    <div className="mt-10">
      <p className="text-3xl mb-6">Comments</p>
      <div className="w-full flex items-center justify-start gap-6 mb-3">
        <div>
          <Avatar>
            <AvatarImage
              className="w-10 h-10 rounded-full"
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>me</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full">
          <Textarea className="rounded-3xl text-lg" placeholder="Comment" />
        </div>
        <Button>POST</Button>
      </div>
      <div className="h-0.5 w-full bg-gray-500 rounded-full mb-3"></div>
      <div className="">
        {arr1.map((item, index) => (
          <div key={index} className="w-full mb-6">
            <div>
              <div className="flex items-center justify-start gap-3">
                <Avatar>
                  <AvatarImage
                    className="w-10 h-10 rounded-full"
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>me</AvatarFallback>
                </Avatar>
                <p className="text-xl">Loki</p>
                <p className="text-sm text-gray-600">1 hour ago</p>
              </div>
            </div>
            <div className="ms-14 w-full">
              <div className="w-full h-6 text-gray-600 rounded-full">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                odio!
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
