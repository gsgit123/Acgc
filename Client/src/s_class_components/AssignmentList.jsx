import React, { useEffect, useState, useContext } from 'react';
import { axiosInstance } from '../lib/axios';
import { ClassContext } from '../pages/SClassDetails';

const AssignmentList = () => {
  const { classData, studentId } = useContext(ClassContext);
  const [assignments, setAssignments] = useState([]);
  const [submitted, setSubmitted] = useState({});
  const [tempUrls, setTempUrls] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(`/assignments/${classData.classCode}`);
        setAssignments(res.data);

        const subs = {};
        for (let a of res.data) {
          const sub = await axiosInstance.get(`/assignments/submissions/${a._id}`);
          const match = sub.data.find((s) => s.studentId._id === studentId);
          if (match) subs[a._id] = true;
        }
        setSubmitted(subs);
      } catch (err) {
        console.error('Error fetching assignments:', err);
      }
    };

    if (classData?.classCode && studentId) fetch();
  }, [classData?.classCode, studentId]);

  const handleSubmit = async (assignmentId) => {
    const fileUrl = tempUrls[assignmentId]?.trim();
    if (!fileUrl) {
      alert('Please provide a valid file URL');
      return;
    }

    try {
      await axiosInstance.post('/assignments/submit', {
        assignmentId,
        studentId,
        fileUrl,
      });
      alert('Submitted!');
      setSubmitted((prev) => ({ ...prev, [assignmentId]: true }));
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Submission failed');
    }
  };

  const handleInputChange = (id, value) => {
    setTempUrls((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="px-4 pt-10 pb-10 bg-[#0b0f19] min-h-screen text-white font-['Nunito']">
      <div className="max-w-4xl mx-auto rounded-xl shadow-2xl bg-[#0f172a] border border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-sky-400 mb-6">Assignments</h2>

        {assignments.length === 0 ? (
          <p className="text-center text-gray-400">No assignments uploaded yet.</p>
        ) : (
          assignments.map((a) => (
            <div
              key={a._id}
              className="bg-[#1e293b] border border-gray-700 rounded-lg p-5 mb-6"
            >
              <h3 className="text-xl font-semibold text-emerald-400 mb-2">{a.title}</h3>
              <p className="text-gray-300 mb-2">{a.description}</p>
              <p className="text-sm text-gray-400 mb-2">
                Deadline: {a.deadline ? a.deadline.slice(0, 10) : 'No deadline'}
              </p>

              {a.fileUrl?.trim() && (
                <a
                  href={a.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 underline text-sm"
                >
                  View File
                </a>
              )}

              {submitted[a._id] ? (
                <p className="text-green-400 mt-4 font-semibold">✅ Submitted</p>
              ) : (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Submission File URL"
                    className="w-full bg-[#0f172a] border border-gray-600 text-white px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:ring-sky-500"
                    onChange={(e) => handleInputChange(a._id, e.target.value)}
                    value={tempUrls[a._id] || ''}
                  />
                  <button
                    onClick={() => handleSubmit(a._id)}
                    className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md font-bold"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentList;
