import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { RootState } from "../redux/utils/selector";

export const Header = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const firstName = useSelector(
    (state: RootState) => state.profile.user.firstName
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={`${process.env.PUBLIC_URL}/argentBankLogo.png`}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {isAuth ? (
            <div className="main-nav-wrapper">
              <i className="fa fa-user-circle"></i>
              <NavLink className="main-nav-username" to="/profile">
                {firstName}
              </NavLink>
              <button className="main-nav-signout" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i> Sign out
              </button>
            </div>
          ) : (
            <NavLink className="main-nav-signin" to="/login">
              <i className="fa fa-user-circle"></i> Sign in
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
