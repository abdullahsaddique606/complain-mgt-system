import React,{useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { RegisterUsers } from '../api/api';
import Toast from './Toast';
const SignUpForm = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const validationSchema = yup.object().shape({
    fullName: yup.string().required('Required field'),
    email: yup.string().required('Required field').email('Enter valid email'),
    contactNumber: yup.number().required('Required field'),
    password: yup.string().required('Required field').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one letter, one number, and one special character, and be at least 8 characters long'
    ),
  });
 

  const { handleSubmit, control, formState: { errors  } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const apiData = {
        userName: data.fullName,
        emailAddress: data.email,
        phoneNumber: data.contactNumber.toString(),
        password: data.password,
      };
      const response = await RegisterUsers(apiData); 
      setAlertType("success");
      setAlertMessage("Registration Successful! Login First");
      setAlertVisible(true);
      // navigate('/login');
      
      console.log('API response:', response.message);
      
    } catch (error) {
      console.error('API error:', error);
      setAlertType("error");
      setAlertMessage(error.response.data.message);
      setAlertVisible(true);
      console.log('API response:', error.response.data.message);
      
    }
  };

  return (
    <div className="">
      <div className="bg-white relative lg:py-20">
      {alertVisible && <Toast type={alertType} message={alertMessage} />}
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <h1 className="text-4xl font-medium text-center leading-snug font-serif absolute animate-bounce" style={{ zIndex: 10 }}>
                Complain management System
              </h1>
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png" alt="failed to load img" className="btn-" />
              </div>
            </div>
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">Sign up for an account</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className="relative">
                      <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                          <>
                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                              Full Name
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
                      {errors.fullName && (
                        <p className="text-red-500 mt-2">{errors.fullName.message}</p>
                      )}
                    </div>
                    <div className="relative">
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <>
                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                              Email
                            </p>
                            <input
                              placeholder="abc123@ex.com"
                              type="text"
                              className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                              {...field}
                            />
                          </>
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 mt-2">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="relative">
                      <Controller
                        name="contactNumber"
                        control={control}
                        render={({ field }) => (
                          <>
                            <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                              Contact Number
                            </p>
                            <input
                              placeholder="Enter contact number"
                              type="text"
                              className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                              {...field}
                            />
                          </>
                        )}
                      />
                      {errors.contactNumber && (
                        <p className="text-red-500 mt-2">{errors.contactNumber.message}</p>
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
                              className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                              {...field}
                            />
                          </>
                        )}
                      />
                      {errors.password && (
                        <p className="text-red-500 mt-2">{errors.password.message}</p>
                      )}
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                       >
                        Sign up
                      </button>
                    </div>
                  </div>
                  <p class="text-sm text-center text-gray-400">
                Already Have Account?{" "}
                <Link
                  to="/Login"
                  class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Login
                </Link>
                .
              </p>
                </form>
              </div>
              <svg viewBox="0 0 91 91" className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300 fill-current" />
              <svg viewBox="0 0 91 91" className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
