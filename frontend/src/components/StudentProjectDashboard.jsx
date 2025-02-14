import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
  baseURL: '/api/v1/profProject',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});
const StudentProjectDashboard = () =>
{
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // useNavigate for programmatic navigation

    const fetchProjects = async () =>
    {
        setLoading(true);
        try
        {
            const response = await api.get('/projects/summary');
            setProjects(response.data.data);
        } catch (error)
        {
            console.error('Error fetching projects:', error.message);
            toast.error('Error fetching project data.');
        } finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        fetchProjects();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            {loading ? (
                <p>Loading projects...</p>
            ) : projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project._id} className="p-4 border rounded shadow-md">
                            <h3 className="text-xl font-semibold">{project.title}</h3>
                            <p className="text-gray-700 mb-2">{project.description}</p>
                            <p className="text-gray-700 mb-2">Status: {project.closed ? "Closed" : "Open"}</p>
                            <p>
                                <strong>Professor: {project.profName}</strong> <br />
                                <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()} <br />
                                <strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}
                            </p>
                            <button
                                className="bg-blue-500 text-white py-1 px-2 rounded mt-4"
                                onClick={() => navigate(`/db/student-prof-project/${project._id}`)}
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
};

export default StudentProjectDashboard;