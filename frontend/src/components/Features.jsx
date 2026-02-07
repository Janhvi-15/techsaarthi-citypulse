const Features = () => {
  return (
    <section className="py-24 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div className="bg-white p-8 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
          <p className="text-gray-600">
            Raise complaints with images and location instantly.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Track Status</h3>
          <p className="text-gray-600">
            Monitor reports as Open, In Progress, or Resolved.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Public Transparency</h3>
          <p className="text-gray-600">
            View public issues and resolutions city-wide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
