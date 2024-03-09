import AuthForm from "../components/AuthForm";

export const Login = () => {
  return (
    <main className="main bg-dark-sign-in">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <AuthForm />
      </section>
    </main>
  );
};
