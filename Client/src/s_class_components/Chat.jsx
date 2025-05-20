import React from 'react';

const ClassChat = ({ classData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chat for {classData.name}</h2>
      <p>This is the chat section.</p>
    </div>
  );
};

export default ClassChat;
