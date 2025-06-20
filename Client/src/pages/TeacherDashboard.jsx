import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import { Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchClasses = async () => {
    try {
      const response = await axiosInstance.get('/class');
      setClasses(response.data.classes || []);
    } catch (err) {
      console.error('Error fetching classes:', err);
      toast.error('Failed to fetch classes');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/class/create', { name, subject });

      toast.success(response.data.message || 'Class created successfully!');
      setName('');
      setSubject('');
      fetchClasses();
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 max-w-7xl mx-auto text-white font-['Nunito'] min-h-screen bg-[#0b0f19] pt-10">

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 z-20 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-xl transition"
        >
          <Plus size={24} />
        </button>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-[#1e293b] rounded-xl shadow-2xl p-8 w-full max-w-lg relative text-white">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              onClick={() => setShowForm(false)}
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-emerald-400">Create New Class</h2>

            <form onSubmit={handleCreateClass} className="space-y-5">
              <div>
                <label className="block text-sm mb-1 text-gray-300">Class Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-300">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 transition font-bold py-2 px-4 rounded-md"
              >
                {loading ? 'Creating...' : 'Create Class'}
              </button>
            </form>
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-6 text-emerald-400">Your Classes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            onClick={() => navigate(`/class/teacher/${cls.classCode}`)}
            className="cursor-pointer bg-[#1e293b] rounded-xl shadow-lg p-6 hover:shadow-emerald-600/40 hover:ring-2 hover:ring-emerald-500 transition"
          >
            <h4 className="text-xl font-bold mb-2 text-emerald-300">{cls.name}</h4>
            <p className="text-gray-300">
              <span className="font-medium text-white">Subject:</span> {cls.subject}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-white">Class Code:</span> {cls.classCode}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-white">Students:</span> {cls.students?.length || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;