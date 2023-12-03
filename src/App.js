import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import PopupForm from "./components/PopupForm";

const App = () => {
  const itemsPerPage = 10;
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((response) => {
        setUsers(response.data);
        // Calculate initial total pages
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Recalculate total pages when users or currentPage changes
  useEffect(() => {
    setTotalPages(Math.ceil(users.length / itemsPerPage));
  }, [users, itemsPerPage, currentPage]);

  const handleCheckboxChange = (id) => {
    const updatedSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];

    setSelectedRows(updatedSelectedRows);
  };

  const handleDeleteRow = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  };

  const handleSelectAll = () => {
    const allIds = users
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((user) => user.id);
    setSelectedRows(selectedRows.length === allIds.length ? [] : allIds);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedRows([]);

    const allIds = users
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((user) => user.id);
    const allSelected =
      selectedRows.length === allIds.length &&
      allIds.every((id) => selectedRows.includes(id));
    const isLastPage = currentPage === totalPages;

    if (allSelected && isLastPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    setEditMode(id);
    setShowPopup(true);
    setPopupData(users.find((user) => user.id === id));
  };

  const handleSave = (id, data) => {
    setEditMode(null);
    setShowPopup(false);
    const updatedUsers = users.map((user) => (user.id === id ? data : user));
    setUsers(updatedUsers);
  };

  const handleInputChange = (field, value) => {
    setPopupData({ ...popupData, [field]: value });
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // useEffect hook recalculates the total pages based on the filtered users,added the users and searchTerm dependencies to it. This ensures that the total pages are updated whenever the users or search term change.

  useEffect(() => {
    const filteredPages = Math.ceil(filteredUsers.length / itemsPerPage);
    setTotalPages(
      searchTerm.trim() !== ""
        ? filteredPages || 1
        : Math.ceil(users.length / itemsPerPage)
    );
  }, [filteredUsers, itemsPerPage, searchTerm, users]);

  return (
    <div className="mt-4 px-8">
      {/* <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1> */}

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-row border border-gray-400 rounded">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-bar p-2 rounded  my-auto"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 my-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <button
          className="delete-selected bg-red-500 hover:bg-red-700 mr-28 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteSelected}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
      <UserTable
        users={paginatedUsers}
        selectedRows={selectedRows}
        handleCheckboxChange={handleCheckboxChange}
        handleDeleteRow={handleDeleteRow}
        editMode={editMode}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleInputChange={handleInputChange}
        itemsPerPage={itemsPerPage}
        handleSelectAll={handleSelectAll}
        setUsers={setUsers}
        className="mt-4"
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        className="my-2"
      />

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <PopupForm
            data={popupData}
            handleSave={handleSave}
            handleClose={() => setShowPopup(false)}
          />
        </div>
      )}
    </div>
  );
};

export default App;