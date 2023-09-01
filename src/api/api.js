import useSWR, { mutate } from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);
let baseUrl = "https://localhost:7235";
export const RegisterUsers = async (params) => {
  const role = "User";
  return await axios.post(
    `${baseUrl}/api/Auth/UserRegisteration?role=${role}`,
    params
  );
};
export const LoggedInUser = async (params) => {
  return await axios.post(`${baseUrl}/api/Auth/login`, params);
};

export const GetUserComplains = (userID) => {
  const { data, error, isLoading } = useSWR(
    `${baseUrl}/api/Complain/GetComplainForUser/${userID}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
export const GetAllComplains = () => {
  const { data, error, isLoading } = useSWR(
    `${baseUrl}/api/Complain/GetAllComplains`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
export const GetAllUsers = () => {
  const { data, error, isLoading } = useSWR(
    `${baseUrl}/api/Complain/GetAllUsers`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
export const SearchComplain = (filter, searchQuery) => {
  const {
    data: filteredData,
    error,
    isLoading,
  } = useSWR(
    `${baseUrl}/api/Complain/SearchComplain?filter=${filter}&searchQuery=${searchQuery}
    `,
    fetcher
  );

  return {
    filteredData,
    error,
    isLoading,
  };
};
export const addComplain = async (complainData, userID) => {
  const url = `${baseUrl}/api/Complain/AddComplains`;
  try {
    await axios.post(url, complainData);
    mutate(`${baseUrl}/api/Complain/GetComplainForUser/${userID}`);
    return true;
  } catch (error) {
    console.error("Error Adding complain:", error);
    return false;
  }
};
export const deleteCategory = async (complainId, userID, userRole) => {
  const url = `${baseUrl}/api/Complain/DeleteUser/${complainId}`;
  try {
    await axios.delete(url);
    if (userRole == "User") {
      mutate(`${baseUrl}/api/Complain/GetComplainForUser/${userID}`);
    } else {
      mutate(`${baseUrl}/api/Complain/GetAllComplains`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting complain:", error);
    return false;
  }
};
export const updateComplain = async (
  complainId,
  updatedComplain,
  userID,
  userRole
) => {
  const url = `${baseUrl}/api/Complain/UpdateUser/${complainId}?role=${userRole}`;

  try {
    const response = await axios.put(url, updatedComplain);
    if (response.status === 200) {
      if (userRole == "User") {
        mutate(`${baseUrl}/api/Complain/GetComplainForUser/${userID}`);
      } else {
        mutate(`${baseUrl}/api/Complain/GetAllComplains`);
      }

      return true;
    } else {
      console.error("Update Category Error:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Update Category Error:", error);
    return false;
  }
};
