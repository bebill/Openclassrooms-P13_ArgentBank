import { useEffect } from "react";
import { AccountData } from "../components/AccountsOverview";
import { TransactionData } from "../components/TransactionDetails";
import { TransactionsTable } from "../components/TransactionsTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../redux/utils/selector";
import * as profileActions from "./../redux/slices/profileSlice";
import { fetchUserProfile } from "../services/fetchData";

export const Transactions = () => {
  const account: AccountData = {
    title: "Argent Bank Checking (x8349)",
    amount: "$2,082.79",
    description: "Available Balance",
  };

  const transactions: TransactionData[] = [
    {
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      currency: "$",
      amount: "5.00",
      balance: "2082.79",
      transactionType: "Electronic",
      category: "Food",
      note: "",
    },
    {
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      currency: "$",
      amount: "10.00",
      balance: "2087.79",
      transactionType: "Electronic",
      category: "Food",
      note: "",
    },
    {
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      currency: "$",
      amount: "20.00",
      balance: "2097.79",
      transactionType: "Electronic",
      category: "Food",
      note: "",
    },
    {
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      currency: "$",
      amount: "30.00",
      balance: "2117.79",
      transactionType: "Electronic",
      category: "Food",
      note: "",
    },
    {
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      currency: "$",
      amount: "40.00",
      balance: "2147.79",
      transactionType: "Electronic",
      category: "Food",
      note: "",
    },
    {
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      currency: "$",
      amount: "50.00",
      balance: "2187.79",
      transactionType: "Electronic",
      category: "Food",
      note: "",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

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
  return (
    <main className="bg-dark-transactions">
      <section className="transactions-header">
        <div className="transactions-header__content-wrapper">
          <h3 className="transactions-header__title">{account.title}</h3>
          <p className="transactions-header__amount">{account.amount}</p>
          <p className="transactions-header__amount-description">
            {account.description}
          </p>
        </div>
      </section>
      <h2 className="sr-only">Transactions</h2>
      <TransactionsTable transactionsTable={transactions} />
    </main>
  );
};
