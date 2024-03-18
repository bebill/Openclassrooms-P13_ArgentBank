import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as profileActions from "../redux/slices/profileSlice";
import { updateUserProfile } from "../services/fetchData";

const EditProfileForm = ({
  firstName,
  lastName,
  onClose,
}: {
  firstName: string;
  lastName: string;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [errorMessage, setErrorMessage] = useState("");

  const isValidName = (name: string) => {
    const regex =
      /^[a-zA-ZàáâãäåçèéêëìíîïðòóôõöùúûüýÿÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÒÓÔÕÖÙÚÛÜÝ\s-]+$/;
    return regex.test(name);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newFirstName || !newLastName) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }
    if (!isValidName(newFirstName) || !isValidName(newLastName)) {
      setErrorMessage(
        "Le prénom et le nom ne peuvent contenir que des lettres, des espaces et le caractère '-'."
      );
      return;
    }
    try {
      console.log("Updating user profile...");
      await updateUserProfile(newFirstName, newLastName);
      console.log("User profile updated successfully");
      dispatch(
        profileActions.updateUserSuccess({
          user: {
            firstName: newFirstName,
            lastName: newLastName,
          },
        })
      );
      onClose();
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Gérer les erreurs
    }
  };

  const handleCancel = () => {
    // Close the edit form without saving changes
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="edit-input-wrapper">
        <div className="edit-input">
          <label htmlFor="newFirstName">
            <span className="sr-only">First name</span>
            <input
              placeholder="First Name"
              type="text"
              id="newFirstName"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
          </label>
        </div>
        <div className="edit-input">
          <label htmlFor="newLastName">
            <span className="sr-only">Last name</span>
            <input
              placeholder="Last Name"
              type="text"
              id="newLastName"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
          </label>
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="edit-buttons-wrapper">
        <button className="edit-button" type="submit">
          Save
        </button>
        <button className="edit-button" type="reset" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
