import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center text-center mt-24 px-4">
      <h1 className="text-5xl font-bold mb-6">
        Report. Track. <span className="text-blue-600">Resolve.</span>
      </h1>

      <p className="max-w-2xl text-gray-600 text-lg mb-10">
        CivicPulse bridges the gap between citizen reporting and municipal
        action.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/roles")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Get Started →
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="border px-6 py-3 rounded-lg"
        >
          📊 View Public Dashboard
        </button>
      </div>
    </section>
  );
};

export default Hero;
