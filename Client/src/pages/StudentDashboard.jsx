import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import { Plus, X } from 'lucide-react';

import { useNavigate } from 'react-router-dom';



const StudentDashboard = () => {

  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEnrolledClasses = async () => {
    try {
      const response = await axiosInstance.get('/class/student');
      setClasses(response.data.classes || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load enrolled classes");
    }
  };

  useEffect(() => {
    fetchEnrolledClasses();
  }, []);

  const handleJoinClass = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/class/join', { classCode });
      toast.success(response.data.message || "Joined class successfully");
      setClassCode('');
      setShowForm(false);
      fetchEnrolledClasses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to join class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 max-w-5xl mx-auto">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 z-20 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg"
        >
          <Plus size={24} />
        </button>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowForm(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-black">Join a Class</h2>
            <form onSubmit={handleJoinClass}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Class Code</label>
                <input
                  type="text"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              >
                {loading ? 'Joining...' : 'Join Class'}
              </button>
            </form>
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4 text-black">Enrolled Classes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div key={cls._id} 
          onClick={() => navigate(`/class/student/${cls.classCode}`)} 
          className="bg-black border rounded-lg shadow p-4 hover:shadow-lg transition">
            <h4 className="text-lg font-bold mb-2">{cls.name}</h4>
            <p><span className="font-medium">Subject:</span> {cls.subject}</p>
            <p><span className="font-medium">Class Code:</span> {cls.classCode}</p>
            <p><span className="font-medium">Teacher:</span> {cls.createdBy?.fullName || 'Unknown'}</p>
          </div>
        ))}


      </div>
    </div>
  );
};

export default StudentDashboard;
