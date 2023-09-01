import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import TableComponent from "./Table";
import {
  GetAllComplains,
  GetUserComplains,
  addComplain,
  deleteCategory,
} from "../api/api";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { FaPlus } from "react-icons/fa";
import ComplainForm from "./AddComplainForm";
import Filter from "./FilterButtons";

const Dashboard = () => {
  const [selectedComplain, setSelectedComplain] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  // const [selectedFilters, setSelectedFilters] = useState({
  //   type: [],
  //   complainStatus: [],
  // });
  
  // const [searchValue, setSearchValue] = useState('');

  
  const theme = useTheme();
  const storedUserData = localStorage.getItem("userData");
  const userData = JSON.parse(storedUserData);

  let userID = null;
  let role = null;
  let userName = null;
  if (userData && userData.data.userID) {
    userID = userData.data.userID;
  }
  if (userData && userData.data.userName) {
    userName = userData.data.userName;
  }
  if (userData && userData.data.role) {
    role = userData.data.role;
  }
  let { data, error, isLoading } = {};
  if (role == "Admin") {
    ({ data, error, isLoading } = GetAllComplains());
  } else {
    ({ data, error, isLoading } = GetUserComplains(userID));
  }
  const handleDelete = (complaintID, userID) => {
    let userRole = userData.data.role;
    deleteCategory(complaintID, userID, userRole);
  };
  useEffect(() => {
    if (role == "Admin") {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  }, []);
  const toggleShowForm = () => {
    setToggleForm(!toggleForm);
    setSelectedComplain(null);
  };
  const closeForm = () => {
    setToggleForm(false);
  };
  const handleUpdate = (complain) => {
    setSelectedComplain(complain);
    setToggleForm(true);
  };
  // const updateSearchValue = (value) => {
  //   setSearchValue(value);
  // };

  // const updateSelectedFilters = (newSelectedFilters) => {
  //   setSelectedFilters(newSelectedFilters);
  // };

  return (
    <div className="flex">
      <div className="w-3/12">
        <SideNav />
      </div>

      <div className="flex flex-col w-10/12">
        <div className="flex flex-col w-full">
        <header className="text-indigo-500 p-4">
            <div className="mx-auto text-right">
              <span className="block text-sm font-bold">
                Welcome {userName}
              </span>
              <span className="block text-xs font-bold">Login as: {role}</span>
            </div>
          </header>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-left mb-4">Dashboard</h1>

          {showButton && (
            <div className="flex justify-start mb-5">
              <Button
                variant="contained"
                className="bg-indigo-500 text-white border-none py-2 px-2 rounded-md transition duration-300 ease-in-out transform hover:bg-indigo-600 hover:scale-105"
                disabled={toggleForm}
                onClick={toggleShowForm}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.getContrastText(
                    theme.palette.primary.main
                  ),
                }}
              >
                <FaPlus /> Add Complain
              </Button>
            </div>
          )}
           {/* {role == 'Admin' && <Filter />} */}
          {toggleForm && (
            <ComplainForm
              onCloseForm={closeForm}
              selectedComplain={selectedComplain}
            />
          )}
          <div className="flex justify-center items-center mr-10">
          
            <TableComponent
              data={data}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              isLoading={isLoading}
              role={role}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
