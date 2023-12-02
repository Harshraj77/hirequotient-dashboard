import React from "react";

const UserTable = ({
  users,
  selectedRows,
  handleCheckboxChange,
  handleDeleteRow,
  editMode,
  handleEdit,
  handleSave,
  itemsPerPage,
  handleSelectAll,
  setUsers,
}) => {
  return (
    <table className="mt-4 border-collapse w-full">
      {/* Table header */}
      <thead>
        <tr className="border-b-2 bg-gray-200 text-center">
          <th className="p-2">
            <input
              type="checkbox"
              checked={selectedRows.length === itemsPerPage}
              onChange={handleSelectAll}
            />
          </th>
          <th className="p-2">ID</th>
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Role</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      {/* Table body */}
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className={`border-b ${
              selectedRows.includes(user.id) ? "bg-gray-100" : ""
            } text-center`}
          >
            <td className="p-2">
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
            </td>
            <td className="p-2">{user.id}</td>
            <td className="p-2">
              {editMode === user.id ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => {
                    const updatedUsers = users.map((u) =>
                      u.id === user.id
                        ? Object.assign({}, u, { name: e.target.value })
                        : u
                    );
                    setUsers(updatedUsers);
                  }}
                  className="border rounded p-1 text-center mx-auto"
                />
              ) : (
                user.name
              )}
            </td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.role}</td>
            <td className="p-2">
              {editMode === user.id ? (
                <button
                  className="border border-black text-black font-bold py-1 px-2 rounded"
                  onClick={() => handleSave(user.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              ) : (
                <>
                  <button
                    className="border border-gray-500 text-black-500 hover:bg-green-100 font-bold py-1 px-2 rounded"
                    onClick={() => handleEdit(user.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    className="border border-gray-500 text-red-500 hover:bg-red-100 font-bold py-1 px-2 rounded ml-2"
                    onClick={() => handleDeleteRow(user.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;