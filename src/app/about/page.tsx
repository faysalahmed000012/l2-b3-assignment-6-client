import team from "@/data/data.json";
import Image from "next/image";

const About = () => {
  return (
    <div className="container mx-auto mt-[120px]">
      <div className="container mx-auto px-4 py-12 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground">
              We believe in the power of shared culinary experiences. Crunch
              Social is where passionate home cooks, culinary students, and food
              enthusiasts come together to create a vibrant recipe-sharing
              community.
            </p>
          </div>
          <div className="relative h-[300px] lg:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"
              width={300}
              height={400}
              alt="People cooking together"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[300px] lg:h-[400px] order-last lg:order-first">
            <Image
              src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=2070&auto=format&fit=crop"
              width={300}
              height={400}
              alt="Recipe sharing and cooking"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Our Mission: Building a Global Culinary Community
            </h2>
            <p className="text-muted-foreground mb-6">
              At Crunch Social, we're dedicated to creating a space where
              culinary knowledge flows freely. Our platform enables users to
              share their favorite recipes, discover new dishes, and connect
              with fellow cooking enthusiasts. From interactive ingredient
              checklists to cooking time estimates, we're making recipe sharing
              more engaging and accessible than ever.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Our Story
            </h2>
            <p className="text-muted-foreground mb-4">
              Crunch Social was born from a simple observation: cooking is
              better when shared. We noticed that while people love to cook,
              they often struggle to find reliable recipes and connect with
              others who share their passion.
            </p>
            <p className="text-muted-foreground mb-4">
              Our platform emerged as a solution to bring together cooking
              enthusiasts in one vibrant community. We created a space where
              home cooks, culinary students, and food lovers can share their
              culinary knowledge and experiences.
            </p>
            <p className="text-muted-foreground">
              Today, Crunch Social continues to grow as a hub for recipe
              sharing, culinary discovery, and community engagement. We're proud
              to foster a space where every recipe tells a story and every
              member contributes to our collective cooking journey.
            </p>
          </div>
          <div className="relative h-[300px] lg:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?q=80&w=2070&auto=format&fit=crop"
              width={300}
              height={400}
              alt="Cooking community"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h1 className="text-center text-3xl md:text-5xl">Meet Our Team</h1>
        <hr className="md:w-[50%] mx-auto my-3 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10" />
        <p className="text-center text-gray-600">
          Meet our team member who are working hard to make this project a
          success.
        </p>
        <div className="mt-10 container mx-auto mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => {
            return (
              <div
                key={member.name}
                className="mt-6 md:mt-0 max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  width={160}
                  height={192}
                  className="w-full h-48 object-cover"
                  src={member.image}
                  alt={member.name}
                />

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
