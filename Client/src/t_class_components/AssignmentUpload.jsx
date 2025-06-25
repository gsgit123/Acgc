import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { Plus, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AssignmentUpload = () => {
  const { classData, teacherId } = useOutletContext(); // 👈 Access from parent route
  const [form, setForm] = useState({ title: '', description: '', fileUrl: '', deadline: '' });
  const [assignments, setAssignments] = useState([]);
  const [submissionsMap, setSubmissionsMap] = useState({});
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/assignments', {
        ...form,
        classCode: classData.classCode,
        createdBy: teacherId,
      });
      setForm({ title: '', description: '', fileUrl: '', deadline: '' });
      setShowForm(false);
      toast.success('Assignment uploaded!');
      fetchAssignments();
    } catch (err) {
      toast.error('Upload failed');
      console.error(err);
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await axiosInstance.get(`/assignments/${classData.classCode}`);
      setAssignments(res.data);
      const map = {};
      for (let assignment of res.data) {
        const subs = await axiosInstance.get(`/assignments/submissions/${assignment._id}`);
        map[assignment._id] = subs.data;
      }
      setSubmissionsMap(map);
    } catch (err) {
      console.error('Error loading assignments:', err);
    }
  };

  useEffect(() => {
    if (classData?.classCode) {
      fetchAssignments();
    }
  }, [classData]);

  return (
    <div className="min-h-screen px-4 pt-10 pb-10 bg-[#0b0f19] text-white font-['Nunito']">
      {/* Floating Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 z-20 bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-xl transition"
        >
          <Plus size={24} />
        </button>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-[#1e293b] rounded-xl shadow-2xl p-8 w-full max-w-lg relative text-white">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              onClick={() => setShowForm(false)}
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-sky-400">Upload New Assignment</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm mb-1 text-gray-300">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 px-4 py-2 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-300">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#0f172a] border border-gray-700 px-4 py-2 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-300">Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full bg-[#0f172a] border border-gray-700 px-4 py-2 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-300">File URL</label>
                <input
                  type="text"
                  value={form.fileUrl}
                  onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                  className="w-full bg-[#0f172a] border border-gray-700 px-4 py-2 rounded-md focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 font-bold py-2 px-4 rounded-md"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Assignment List */}
      <div className="max-w-4xl mx-auto mt-6">
        <h3 className="text-2xl font-bold mb-4 text-sky-400">Assignments for {classData.classCode}</h3>
        {assignments.length === 0 ? (
          <p className="text-gray-400">No assignments uploaded yet.</p>
        ) : (
          assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="mb-6 p-4 bg-[#1e293b] rounded-md border border-gray-600 shadow-md"
            >
              <h4 className="text-lg font-bold text-white">{assignment.title}</h4>
              <p className="text-gray-300">{assignment.description}</p>
              <p className="text-sm text-gray-400 mt-1">
                Deadline: {assignment.deadline ? assignment.deadline.slice(0, 10) : 'N/A'}
              </p>
              {assignment.fileUrl && (
                <a
                  href={assignment.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 underline text-sm"
                >
                  View File
                </a>
              )}

              <h5 className="mt-4 font-semibold text-sky-400">Submissions:</h5>
              {submissionsMap[assignment._id]?.length > 0 ? (
                <ul className="list-disc list-inside text-white">
                  {submissionsMap[assignment._id].map((sub) => (
                    <li key={sub._id}>
                      {sub.studentId?.fullName || 'Unnamed'} —{' '}
                      {sub.fileUrl && (
                        <a
                          href={sub.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sky-300 underline"
                        >
                          View Submission
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No submissions yet.</p>
              )}

              <button
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
                onClick={async () => {
                  if (!window.confirm('Are you sure you want to delete this assignment and all its submissions?')) return;
                  try {
                    await axiosInstance.delete(`/assignments/${assignment._id}`);
                    toast.success('Deleted successfully');
                    fetchAssignments();
                  } catch (err) {
                    toast.error('Failed to delete');
                    console.error(err);
                  }
                }}
              >
                Delete Assignment
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentUpload;
