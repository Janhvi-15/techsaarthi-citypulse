import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center mt-24 px-4">
      {/* Tag line */}
      <div className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-600 mb-6">
        📈 Transparent Urban Infrastructure Management
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Report. Track. <span className="text-blue-600">Resolve.</span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-gray-600 text-lg mb-10">
        CivicPulse bridges the gap between citizen reporting and municipal
        action. Every infrastructure issue tracked from discovery to resolution
        with full accountability.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
          Get Started →
        </button>
        <button className="border px-6 py-3 rounded-lg text-lg hover:bg-gray-100">
          📊 View Public Dashboard
        </button>
      </div>
    </section>
  );
};

export default Hero;
