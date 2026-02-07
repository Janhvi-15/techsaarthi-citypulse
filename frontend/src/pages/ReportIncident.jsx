import { useState } from "react";

const ReportIncident = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Road Damage");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [locationText, setLocationText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !locationText.trim()) {
      alert("Please fill Title, Description and Location.");
      return;
    }

    try {
      setLoading(true);

      // IMPORTANT: FormData for image upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("location", locationText);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(
        "http://localhost:3000/api/v1/incidents",
        {
          method: "POST",
          credentials: "include",
          body: formData
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit report");
      }

      alert("Incident reported successfully ✅");

      // Reset form
      setTitle("");
      setCategory("Road Damage");
      setDescription("");
      setImageFile(null);
      setLocationText("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Report Incident
        </h1>
        <p className="text-gray-600 mt-2">
          Provide details so the municipality can take action quickly.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 mt-8 shadow-md space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="e.g., Water leakage near main road"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option>Road Damage</option>
              <option>Water Leakage</option>
              <option>Garbage Overflow</option>
              <option>Street Light Issue</option>
              <option>Drainage Problem</option>
              <option>Electricity Issue</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Explain the issue briefly..."
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files?.[0] || null)
              }
              className="w-full p-3 border rounded-xl bg-white"
            />

            {imageFile && (
              <p className="text-sm text-gray-600 mt-2">
                Selected:{" "}
                <span className="font-medium">
                  {imageFile.name}
                </span>
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              type="text"
              placeholder="e.g., Andheri East, Mumbai"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
