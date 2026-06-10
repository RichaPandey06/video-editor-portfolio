import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import API_URL from "../config/api";
const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProject();
  }, []);

 const fetchProject = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);
    console.log("ID:", id);

    const response = await axios.get(
  `${API_URL}/project/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      const project = response.data;
      setTitle(project.title);
      setCategory(project.category);
      setDescription(project.description);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load project");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(
  `${API_URL}/project/${id}`,
        { title, category, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Project Updated Successfully");
      navigate("/admin/projects"); // redirect back after update
    } catch (error) {
      console.error(error);
      toast.error("❌ Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex justify-center items-start pt-32 pb-16">
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl p-10 border border-purple-500/30 shadow-2xl">
        <h1 className="text-3xl font-bold mb-10 text-center text-transparent bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text">
          Edit Project
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
            className="w-full p-3 rounded-lg bg-black border border-purple-500/30 focus:outline-none focus:border-purple-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-purple-500/30 focus:outline-none focus:border-purple-500"
          >
            <option value="">Select Category</option>
            <option value="YouTube">YouTube</option>
            <option value="Instagram">Instagram</option>
            <option value="Commercial">Commercial</option>
            <option value="Motion Graphics">Motion Graphics</option>
          </select>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            placeholder="Project Description"
            className="w-full p-3 rounded-lg bg-black border border-purple-500/30 focus:outline-none focus:border-purple-500 resize-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-300"
          >
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
