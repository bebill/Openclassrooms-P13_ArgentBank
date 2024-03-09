import axios from "axios";

export const apiUrl = "http://localhost:3001/api/v1/user";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email,
      password,
    });
    return response.data.body.token;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/profile`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.body;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
