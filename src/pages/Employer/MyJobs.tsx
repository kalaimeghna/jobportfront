import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Job {
  _id: string;
  title: string;
  jobType: string;
  salary: string;
  createdAt: string;
}

const MyJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const response = await axios.get('/api/jobs/my', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setJobs(jobs.filter(job => job._id !== id));
      } catch (error) {
        console.error('Error deleting job', error);
        alert('Failed to delete job');
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading your jobs...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Job Postings</h2>
        <Link to="/employer/create-job" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Post New Job
        </Link>
      </div>
      
      {jobs.length === 0 ? (
        <p className="text-gray-500">You haven't posted any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3">Title</th>
                <th className="p-3">Type</th>
                <th className="p-3">Salary</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">{job.jobType}</td>
                  <td className="p-3">{job.salary}</td>
                  <td className="p-3 flex gap-2">
                    <Link 
                      to={`/employer/edit-job/${job._id}`} 
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => deleteJob(job._id)} 
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyJobs;