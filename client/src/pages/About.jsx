import React, { useEffect } from "react";
import about from "./about.png";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-around">
          <div className="md:col-span-1">
            <img
              src={about} // Replace with your image URL
              alt="About Us"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:col-span-1 flex flex-col justify-center">
            <p className="text-lg leading-relaxed mb-4">
              Our BlogMania is a versatile and secure space where you can
              unleash your creativity and connect with like-minded individuals.
              Here are some of the key features that make our platform stand
              out:
            </p>
            <p className="text-lg leading-relaxed mb-4 flex flex-col gap-4">
              <p>
                <span className="text-xl font-semibold">
                  User Account Creation:
                </span>{" "}
                With just a few simple steps, you can create your account on our
                platform. Rest assured, our platform prioritizes security,
                ensuring that your personal information remains safe and
                protected.
              </p>
              <p>
                <span className="text-xl font-semibold">
                  Create Captivating Blogs:
                </span>{" "}
                Express yourself freely by creating engaging and informative
                blogs on topics that matter to you. Whether you're passionate
                about technology, travel, food, or any other niche, our platform
                provides the tools you need to craft compelling content.
              </p>
              <p>
                <span className="text-xl font-semibold">
                  Interactive Community:
                </span>{" "}
                Engage with fellow users through comments and likes on their
                blogs. Our platform fosters a positive and supportive community
                where members can share ideas, provide feedback, and build
                connections.
              </p>
              <p>
                <span className="text-xl font-semibold">
                  Positive Vibes Only:
                </span>{" "}
                We believe in maintaining a welcoming environment for all users.
                To uphold the integrity of our community, we encourage
                constructive and respectful interactions. Let's spread
                positivity and inspiration through our blogs!
              </p>
              <p>
                <span className="text-xl font-semibold">
                  Discover and Enjoy:
                </span>{" "}
                Explore a diverse range of blogs created by other users and
                discover new perspectives. Whether you're seeking inspiration,
                knowledge, or entertainment, our platform offers a wealth of
                content to enjoy.
              </p>
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Join our vibrant blogging community today and embark on a journey
              of creativity, connection, and discovery. Let's create, inspire,
              and uplift each other through the power of words!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
