import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-32 mb-32 px-8">
      <div className="max-w-6xl mx-auto bg-blue-600 rounded-3xl p-12 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to improve your city?</h2>

        <p className="max-w-2xl mx-auto text-blue-100 mb-8">
          Join thousands of citizens helping make urban infrastructure better.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => navigate("/auth")}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl text-lg font-semibold"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="border border-white px-8 py-3 rounded-xl text-lg"
          >
            View Public Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
