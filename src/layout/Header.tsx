import { Link, NavLink } from "react-router-dom";

export const Header = () => {
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
          <NavLink className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
             Sign In
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
