import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUser } from "../redux/utils/selector";
import * as profileActions from "./../redux/slices/profileSlice";
import { fetchUserProfile } from "../services/fetchData";
import EditProfileForm from "../components/EditProfileForm";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          navigate("/login");
        }
        if (token) {
          const userProfile = await fetchUserProfile(token);
          dispatch(profileActions.setUser({ user: userProfile }));
        }
      } catch (error: any) {
        console.error(error.message);
        navigate("/login");
      }
    };

    fetchData();
  }, [token, navigate, dispatch]);

  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  if (token) {
    return (
      <main className="main bg-dark-user">
        <h1>Welcome back</h1>
        {isEditing ? (
          <EditProfileForm firstName="" lastName="" onClose={handleCloseEdit} />
        ) : (
          <div className="header">
            <h1>
              {user.firstName} {user.lastName}
            </h1>

            <button className="edit-button" onClick={handleEditName}>
              Edit Name
            </button>
          </div>
        )}
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    );
  }
};
