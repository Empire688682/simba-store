import React from "react";
import { PawPrint, Heart, Star } from "lucide-react";

const About = () => {
  return (
    <section className="min-h-screen bg-amber-50 py-16 px-6 flex flex-col items-center justify-center">
      <div className="max-w-5xl bg-white rounded-2xl shadow-lg p-10 md:p-14">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <PawPrint className="text-amber-500 mb-3" size={40} />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            About <span className="text-amber-500">Simba-Store</span>
          </h1>
          <p className="text-gray-600 max-w-2xl">
            We believe every dog deserves quality care, comfort, and love.  
            Simba-Store brings the best pet products to your doorstep,  
            designed to make your furry friends healthier and happier 🐶💛
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {/* Image / Illustration */}
          <div className="flex items-center justify-center">
            <img
              src="/happy-dog.png"
              alt="Happy dog"
              className="rounded-xl shadow-md object-cover w-full h-72"
            />
          </div>

          {/* Story Text */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Our Story 🐾
            </h2>
            <p className="text-gray-600 mb-4">
              Simba-Store started with a simple idea — to provide premium,
              affordable, and eco-friendly pet supplies for dog owners across
              Nigeria and beyond. From our humble beginnings in 2021, we’ve
              grown into a trusted name for pet lovers who value quality and
              care.
            </p>
            <p className="text-gray-600">
              Every product we sell is carefully chosen, tested, and approved
              for comfort, durability, and tail-wagging satisfaction.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-14 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            To strengthen the bond between humans and their dogs by providing
            top-quality, safe, and affordable pet essentials — because your pet
            deserves nothing less than the best 💛.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-amber-100 rounded-xl p-6 flex flex-col items-center">
              <Heart className="text-amber-500 mb-2" size={28} />
              <h3 className="font-semibold text-gray-800">Love & Care</h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                Every product is made with love and tested for comfort.
              </p>
            </div>

            <div className="bg-amber-100 rounded-xl p-6 flex flex-col items-center">
              <PawPrint className="text-amber-500 mb-2" size={28} />
              <h3 className="font-semibold text-gray-800">Pet Wellness</h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                Promoting healthy, happy lives for pets everywhere.
              </p>
            </div>

            <div className="bg-amber-100 rounded-xl p-6 flex flex-col items-center">
              <Star className="text-amber-500 mb-2" size={28} />
              <h3 className="font-semibold text-gray-800">Trusted Quality</h3>
              <p className="text-gray-600 text-sm text-center mt-2">
                We only offer safe, durable, and vet-approved products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
