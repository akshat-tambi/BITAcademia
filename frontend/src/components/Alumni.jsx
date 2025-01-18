import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

export default function Alumni() {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [program, setProgram] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch existing details
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const statusResponse = await axios.get("/api/v1/alumni/status", {
          withCredentials: true
        });

        setIsDetailsSubmitted(statusResponse.data.data.hasSubmittedForm);

        if (statusResponse.data.data.hasSubmittedForm) {
          const detailsResponse = await axios.get("/api/v1/alumni/me", {
            withCredentials: true
          });

          const { name, batch, program, graduationYear } = detailsResponse.data.data;
          setName(name);
          setBatch(batch);
          setProgram(program);
          setGraduationYear(graduationYear);
        }
      } catch (error) {
        setError("Failed to fetch alumni status");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
        title: "Are you sure?",
        text: "Details will not be editable after submission",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit",
        cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
        try {
            setLoading(true);
            const response = await axios.post("/api/v1/alumni/create", {
                name,
                batch,
                program,
                graduationYear
            }, {
                withCredentials: true
            });

            // Store the returned alumni data
            const alumniData = response.data.data;
            setName(alumniData.name);
            setBatch(alumniData.batch);
            setProgram(alumniData.program);
            setGraduationYear(alumniData.graduationYear);
            
            setIsDetailsSubmitted(true);
            Swal.fire("Success!", "Alumni details submitted successfully", "success");
        } catch (error) {
            Swal.fire("Error!", error.response?.data?.message || "Failed to submit details", "error");
        } finally {
            setLoading(false);
        }
    }
};

  const handleDonate = async () => {
    const result = await Swal.fire({
      title: "Confirm Donation",
      text: "Do you really want to donate to the institution?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      try {
        await axios.post("/api/v1/alumni/donate", {}, {
          withCredentials: true
        });
        Swal.fire("Success!", "Donation request sent successfully", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to process donation request", "error");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} />
    </div>;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Alumni Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="w-full border-b border-gray-400 py-2 outline-none"
              disabled={isDetailsSubmitted}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Batch</label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Enter Batch"
              className="w-full border-b border-gray-400 py-2 outline-none"
              disabled={isDetailsSubmitted}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Program</label>
            <input
              type="text"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              placeholder="Enter Program"
              className="w-full border-b border-gray-400 py-2 outline-none"
              disabled={isDetailsSubmitted}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Graduation Year</label>
            <input
              type="text"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              placeholder="Enter Graduation Year"
              className="w-full border-b border-gray-400 py-2 outline-none"
              disabled={isDetailsSubmitted}
              required
            />
          </div>
          {!isDetailsSubmitted && (
            <button
              type="submit"
              className={`w-full bg-black text-white py-2 rounded-md ${loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="#ffffff" /> : "Submit"}
            </button>
          )}
        </form>
        {isDetailsSubmitted && (
          <div className="space-y-4">
            <button
              onClick={() => navigate('/db/add-work-experience')}
              className="w-full bg-green-500 text-white p-2 rounded"
            >
              Add Work Experience
            </button>

            <button
              onClick={() => navigate('/db/show-work-experience')}
              className="w-full bg-purple-500 text-white p-2 rounded"
            >
              View Work Experiences
            </button>

            <button
              onClick={handleDonate}
              className="w-full bg-yellow-500 text-white p-2 rounded"
            >
              Donate to Institution
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
