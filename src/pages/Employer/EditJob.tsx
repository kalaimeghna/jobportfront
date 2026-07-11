import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditJob = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: 'Full-time',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobs/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching job details', error);
        alert('Could not load job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`/api/jobs/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/employer/my-jobs');
    } catch (error) {
      console.error('Error updating job', error);
      alert('Failed to update job');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading job details...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Job Posting</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <input
            name="title"
            value={formData.title}
            required
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            required
            className="w-full p-2 border rounded"
            rows={4}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Requirements</label>
          <input
            name="requirements"
            value={formData.requirements}
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Salary</label>
            <input
              name="salary"
              value={formData.salary}
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Job Type</label>
            <select 
              name="jobType" 
              value={formData.jobType} 
              className="w-full p-2 border rounded" 
              onChange={handleChange}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {submitting ? 'Updating...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/employer/my-jobs')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;