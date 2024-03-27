import { useNavigate } from "react-router-dom";

export interface AccountData {
  title: string;
  amount: string;
  description: string;
}

export const Account = ({ account }: { account: AccountData }) => {
  const navigate = useNavigate();

  const handleViewTransactions = () => {
    navigate("/transactions");
  };

  return (
    <section className="account">
      <div className="account__content-wrapper">
        <h3 className="account__title">{account.title}</h3>
        <p className="account__amount">{account.amount}</p>
        <p className="account__amount-description">{account.description}</p>
      </div>
      <div className="account__content-wrapper account__content-wrapper--cta">
        <button className="transaction-button" onClick={handleViewTransactions}>
          View transactions
        </button>
      </div>
    </section>
  );
};
