import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoggedInUser } from "../api/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import Toast from "./Toast"
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const validationSchema = yup.object().shape({
    userName: yup.string().required("Required field"),
    password: yup.string().required("Required field"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitForm = async (data) => {
    try {
      const response = await LoggedInUser(data);
      setAlertType("success");
      setAlertMessage("Login Successful");
      setAlertVisible(true);
      localStorage.setItem("userData", JSON.stringify(response));
      login();
      navigate("/appdashboard");
    } catch (error) {
        setAlertType("error");
        setAlertMessage("Check Credentials");
        setAlertVisible(true);
    }
  };
  return (
    <div className="">
      <div className="bg-white relative lg:py-20">
      {alertVisible && <Toast type={alertType} message={alertMessage} />}
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <h1
                className="text-4xl font-medium text-center leading-snug font-serif absolute animate-bounce"
                style={{ zIndex: 10 }}
              >
                Complain management System
              </h1>
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img
                  src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                  alt="failed to load img"
                  className="btn-"
                />
              </div>
            </div>
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                  Login for an account
                </p>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className="relative">
                      <Controller
                        name="userName"
                        control={control}
                        render={({ field }) => (
                          <>
                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                              User Name
                            </p>
                            <input
                              placeholder="Enter full name"
                              type="text"
                              className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                              {...field}
                            />
                          </>
                        )}
                      />
                      {errors.userName && (
                        <p className="text-red-500 mt-2">
                          {errors.userName.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <>
                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                              Password
                            </p>
                            <input
                              placeholder="Enter password"
                              type="password"
                              className="border placeholder-gray-400 focus:outline-none focus:border-black w-full px-4 pt-4 pb-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
                              {...field}
                            />
                          </>
                        )}
                      />
                      {errors.password && (
                        <p className="text-red-500 mt-2">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                  <p class="text-sm text-center text-gray-400">
                    Don't have an account yet?{" "}
                    <Link
                      to="/signup"
                      class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                    >
                      Sign up
                    </Link>
                    .
                  </p>
                </form>
              </div>
              <svg
                viewBox="0 0 91 91"
                className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300 fill-current"
              />
              <svg
                viewBox="0 0 91 91"
                className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500 fill-current"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
