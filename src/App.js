import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === itemsPerPage}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.id} className={selectedRows.includes(user.id) ? 'highlight' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit">Edit</button>
                <button className="delete" onClick={() => handleDeleteRow(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div>
        <button className="first-page" onClick={() => handlePageChange(1)}>First</button>
        <button className="previous-page" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, i) => i + 1).map(page => (
          <button key={page} onClick={() => handlePageChange(page)} className={page === currentPage ? 'active' : ''}>{page}</button>
        ))}
        <button className="next-page" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}>Next</button>
        <button className="last-page" onClick={() => handlePageChange(Math.ceil(filteredUsers.length / itemsPerPage))}>Last</button>
      </div>
      {/* Delete Selected */}
      <button className="delete-selected" onClick={handleDeleteSelected}>Delete Selected</button>
    </div>
  );
};

export default App;
