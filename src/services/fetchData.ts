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
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      if (errorMessage.includes("User not found")) {
        // Utilisateur non trouvé dans la base de données
        throw new Error("Nom d'utilisateur incorrect. Veuillez réessayer.");
      } else if (errorMessage.includes("Password is invalid")) {
        // Mot de passe incorrect
        throw new Error("Mot de passe incorrect. Veuillez réessayer.");
      } else {
        // Autre erreur
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
    return response.data.body;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
