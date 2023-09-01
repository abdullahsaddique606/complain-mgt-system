import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { addComplain, updateComplain } from "../api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toast from "./Toast";
import CircularProgress from '@mui/material/CircularProgress';

const ComplainForm = ({ onCloseForm, selectedComplain }) => {
  const [showForm, setShowForm] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    type: yup.string().required("Type is required"),
    description: yup.string().required("Description is required"),
    // status: yup.string().required("Status is required"),
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  let storedUserData = localStorage.getItem("userData");
  const userData = JSON.parse(storedUserData);
  let userID = null;
  let userRole = null;;
  if (userData && userData.data.userID) {
    userID = userData.data.userID;
  }
  if (userData && userData.data.role) {
    userRole = userData.data.role;
  }
  const handleFormSubmit = async (data) => {
    const newData = {
      ...data,
      userID: userID,
      status: selectedComplain ? data.status : "new",
    };
    setLoading(true);
    setTimeout(() => {
        setLoading(false); // Hide the progress indicator after three seconds
      }, 3000);
    
    if (selectedComplain != null) {
        console.log( "Update Clicked")
      const isSuccess = await updateComplain(
        selectedComplain.complaintId,
        newData,
        userID,
        userRole,
      );
      if (isSuccess) {
        setAlertType("success");
        setAlertMessage("Complain Updated Successfully");
        setAlertVisible(true);
        onCloseForm();
        reset();
      } else {
        setAlertType("error");
        setAlertMessage("Failed to update the complain");
        setAlertVisible(true);
      }
    } else {
      console.log("Add clicked suceesfully:", { newData });
      const isSucces = await addComplain(newData, userID);
      if (isSucces) {
        setAlertType("success");
        setAlertMessage("Complain Added Successfully");
        setAlertVisible(true);
        onCloseForm();
      } else {
        setAlertType("error");
        setAlertMessage("Failed to add the complain");
        setAlertVisible(true);
      }
    }
  };

  useEffect(() => {
    // Set initial form values based on selectedComplain
    if (selectedComplain) {
      setValue("title", selectedComplain.title);
      setValue("type", selectedComplain.type);
      setValue("description", selectedComplain.description);
      setValue("status", selectedComplain.status);
    }
  }, [selectedComplain, setValue]);

  return (
    <div className="flex items-center justify-center p-12">
      <div className="w-full">
        {alertVisible && <Toast type={alertType} message={alertMessage} />}
        <div className="formbold-form-wrapper mx-auto w-full max-w-[550px] rounded-lg border border-[#e0e0e0] bg-white">
          <div className="flex items-center justify-between rounded-t-lg bg-[#6A64F1] py-4 px-9">
            <h3 className="text-xl font-bold text-white">
              Add Information of Complain
            </h3>
            <button onClick={onCloseForm}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.474874 0.474874C1.10804 -0.158291 2.1346 -0.158291 2.76777 0.474874L16.5251 14.2322C17.1583 14.8654 17.1583 15.892 16.5251 16.5251C15.892 17.1583 14.8654 17.1583 14.2322 16.5251L0.474874 2.76777C-0.158291 2.1346 -0.158291 1.10804 0.474874 0.474874Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.474874 16.5251C-0.158291 15.892 -0.158291 14.8654 0.474874 14.2322L14.2322 0.474874C14.8654 -0.158292 15.892 -0.158291 16.5251 0.474874C17.1583 1.10804 17.1583 2.1346 16.5251 2.76777L2.76777 16.5251C2.1346 17.1583 1.10804 17.1583 0.474874 16.5251Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="py-6 px-9">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Title
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter title of your complain"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 mt-2">{errors.title.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="type"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Type
              </label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="type"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                )}
              />
              {errors.type && (
                <p className="text-red-500 mt-2">{errors.type.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows="4"
                    placeholder="Explain your complain"
                    className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 mt-2">
                  {errors.description.message}
                </p>
              )}
            </div>
            
            {selectedComplain ? ( <div className="mb-5">
                <label
                  htmlFor="status"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Status"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 mt-2">{errors.status.message}</p>
                )}
              </div>
            ):null}

            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                {selectedComplain ? "Update" : "Add"} Complain
              </button>
              {loading && (
              <div className="mt-2 flex justify-center">
                <CircularProgress size={24} color="primary" /> 
              </div>
            )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplainForm;
