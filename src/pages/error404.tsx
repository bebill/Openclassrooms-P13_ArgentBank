import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <main className="main bg-dark-user">
      <section className="error">
        <h1 className="error-title">404</h1>
        <p className="error-text">
          Oups! La page que vous demandez n'a pas été trouvée.
        </p>

        <Link className="error-link" to="/">
          <button className="error-button">
            Retourner sur la page d'accueil
          </button>
        </Link>
      </section>
    </main>
  );
};
