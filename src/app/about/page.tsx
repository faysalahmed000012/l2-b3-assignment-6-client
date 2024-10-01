import team from "@/data/data.json";
import Image from "next/image";

const About = () => {
  console.log(team);
  return (
    <div className="mx-[20px] mt-[150px] min-h-[70vh]">
      <div className="mx-auto md:max-w-[60%] lg:max-w-[50%]">
        <h1 className="text-center text-3xl md:text-5xl">Crunch Social</h1>
        <hr className="my-3 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10" />
        <p className="mt-6  text-gray-600">
          Crunch Social is a{" "}
          <span className="font-bold">Recipe Sharing Community</span>, a
          full-stack web application aimed at bringing together cooking
          enthusiasts, providing a platform where users can share, discover, and
          organize recipes. Targeting home cooks, culinary students, and anyone
          passionate about cooking, the platform allows users to post favorite
          recipes, contribute interactive ingredient checklists, and share
          cooking time estimates. The community fosters sharing culinary
          knowledge, supporting social engagement.
        </p>
        <h1 className="mt-16 text-center text-3xl md:text-5xl">Our Mission</h1>
        <hr className="my-3 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10" />
        <p className="mt-6  text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          quia expedita rerum, nihil nisi placeat! Nemo magni ab sapiente odit
          amet, exercitationem at animi inventore saepe labore laboriosam
          quaerat omnis quas eligendi, tenetur sunt fuga beatae a laudantium
          asperiores consequuntur facere! Ut, quod voluptatem. Est numquam
          laboriosam ipsam perspiciatis maiores!
        </p>
      </div>
      <div className="mt-16">
        <h1 className="text-center text-3xl md:text-5xl">Meet Our Team</h1>
        <hr className="md:w-[50%] mx-auto my-3 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10" />
        <p className="text-center text-gray-600">
          Meet our team member who are working hard to make this project a
          success.
        </p>
        <div className="mt-10 md:max-w-[1500px] mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
          {team.map((member) => {
            return (
              <div
                key={member.name}
                className="mt-6 md:mt-0 max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Image */}
                <Image
                  width={160}
                  height={192}
                  className="w-full h-48 object-cover"
                  src={member.image}
                  alt={member.name}
                />

                {/* Info */}
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {member.name}
                  </h2>
                  <p className="text-gray-700 text-sm font-medium">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mt-2">
                    {member.shortDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
