import axios from "axios";

export const apiUrl = "http://localhost:3001/api/v1/user";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email,
      password,
    });
    const tokenJwt = response.data.body.token;
    localStorage.setItem("token", tokenJwt);
    console.log("Logged in successfully. Token:", tokenJwt);
    return tokenJwt;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      if (errorMessage.includes("User not found")) {
        throw new Error("Nom d'utilisateur incorrect. Veuillez réessayer.");
      } else if (errorMessage.includes("Password is invalid")) {
        throw new Error("Mot de passe incorrect. Veuillez réessayer.");
      } else {
        throw new Error("Une erreur s'est produite. Veuillez réessayer.");
      }
    } else {
      throw new Error(
        "Une erreur s'est produite lors de la configuration de la requête."
      );
    }
  }
};

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/profile`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("User profile fetched successfully:", response.data.body);
    return response.data.body;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUserProfile = async (
  newFirstName: string,
  newLastName: string
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await axios.put(
      `${apiUrl}/profile`,
      {
        firstName: newFirstName,
        lastName: newLastName,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("User profile updated successfully");
    } else {
      console.error("Failed to update user profile");
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};
