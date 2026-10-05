import { useState } from "react";
import Navbar1 from "../components/Navbar1";

const ReportIncident = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Road Damage");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [locationText, setLocationText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !description.trim() || !locationText.trim()) {
      alert("Please fill Title, Description and Location.");
      return;
    }

    // Payload (later connect to backend or localStorage)
    const payload = {
      title,
      category,
      description,
      locationText,
      imageFileName: imageFile ? imageFile.name : null,
      createdAt: Date.now(), // important for sorting later
      status: "Open",
    };

    console.log("Report Submitted:", payload);
    alert("Report submitted successfully ✅");

    // Reset form
    setTitle("");
    setCategory("Road Damage");
    setDescription("");
    setImageFile(null);
    setLocationText("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold">Report Incident</h1>
        <p className="text-gray-600 mt-2">
          Provide details so the municipality can take action quickly.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-2xl p-6 mt-8 shadow-sm space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="e.g., Water leakage near main road"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option>Road Damage</option>
              <option>Water Leakage</option>
              <option>Power Outage</option>
              <option>Street Light</option>
              <option>Drainage</option>
              <option>Garbage</option>
              <option>Other</option>
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
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Add Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full p-3 border rounded-xl bg-white"
            />

            {imageFile && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: <span className="font-medium">{imageFile.name}</span>
              </p>
            )}
          </div>

          {/* Location (Manual Only) */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              type="text"
              placeholder="Enter area, landmark, city (e.g., Andheri East, Mumbai)"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
