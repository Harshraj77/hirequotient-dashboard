import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
// import Container from 'react-bootstrap/Container';
const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCheckboxChange = (id) => {
    const updatedSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter(rowId => rowId !== id)
      : [...selectedRows, id];

    setSelectedRows(updatedSelectedRows);
  };

  const handleDeleteRow = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };

  const handleSelectAll = () => {
    const allIds = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(user => user.id);
    setSelectedRows(selectedRows.length === allIds.length ? [] : allIds);
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(user => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset page when performing a new search
  };

  const handleEdit = (id) => {
    setEditMode(id);
  };

  const handleSave = (id) => {
    setEditMode(null);
    // Perform save logic here, e.g., send data to the server
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mt-4 px-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 rounded w-2/6 mb-4"
      />
      <button className="delete-selected mx-2 border border-red-400 px-2 rounded" onClick={handleDeleteSelected}>Delete Selected</button>
      </div>
      <UserTable
        users={paginatedUsers}
        selectedRows={selectedRows}
        handleCheckboxChange={handleCheckboxChange}
        handleDeleteRow={handleDeleteRow}
        editMode={editMode}
        handleEdit={handleEdit}
        handleSave={handleSave}
        itemsPerPage={itemsPerPage}
        handleSelectAll={handleSelectAll}
        setUsers={setUsers}
        className='mt-4'
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        className='my-2'
      />
    
    </div>
  );
};

export default App;
