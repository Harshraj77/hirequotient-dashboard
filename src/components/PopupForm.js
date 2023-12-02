import React, { useState } from 'react';

const PopupForm = ({ data, handleSave, handleClose }) => {
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [role, setRole] = useState(data.role);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !role) {
      alert('Please fill in all fields');
      return;
    }
    handleSave(data.id, { ...data, name, email, role });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg w-1/2 z-50">
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold mb-4">Edit User</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-400 p-2 rounded w-full"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;