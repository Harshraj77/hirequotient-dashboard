import React from 'react';

const UserTable = ({ users, selectedRows, handleCheckboxChange, handleDeleteRow, editMode, handleEdit, handleSave, itemsPerPage, handleSelectAll, setUsers }) => {
  return (
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
        {users.map(user => (
          <tr key={user.id} className={selectedRows.includes(user.id) ? 'highlight' : ''}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
            </td>
            <td>{user.id}</td>
            <td>
              {editMode === user.id ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => {
                    const updatedUsers = [...users];
                    const editedUserIndex = updatedUsers.findIndex(u => u.id === user.id);
                    updatedUsers[editedUserIndex].name = e.target.value;
                    setUsers(updatedUsers);
                  }}
                />
              ) : (
                user.name
              )}
            </td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              {editMode === user.id ? (
                <button className="save" onClick={() => handleSave(user.id)}>Save</button>
              ) : (
                <button className="edit" onClick={() => handleEdit(user.id)}>Edit</button>
              )}
              <button className="delete" onClick={() => handleDeleteRow(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
