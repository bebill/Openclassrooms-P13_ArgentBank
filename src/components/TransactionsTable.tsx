import React, { useState } from "react";
import { TransactionData } from "../components/TransactionDetails";
import { TransactionDetails } from "../components/TransactionDetails";

interface TransactionProps {
  transactionsTable: TransactionData[];
}

export const TransactionsTable = ({
  transactionsTable,
}: {
  transactionsTable: TransactionProps["transactionsTable"];
}) => {
  const [openTransactionIndex, setOpenTransactionIndex] = useState<
    number | null
  >(null);

  const toggleTransactionDetails = (index: number) => {
    if (openTransactionIndex === index) {
      setOpenTransactionIndex(null);
    } else {
      setOpenTransactionIndex(index);
    }
  };

  return (
    <section className="transactions-table">
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>DATE</th>
            <th>DESCRIPTION</th>
            <th>AMOUNT</th>
            <th>BALANCE</th>
          </tr>
        </thead>
        <tbody>
          {transactionsTable.map((transaction, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleTransactionDetails(index)}>
                <td>
                  <i
                    className={`fa fa-chevron-down ${
                      openTransactionIndex === index ? "rotate" : ""
                    }`}
                  ></i>
                </td>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>
                  {transaction.currency} {transaction.amount}
                </td>
                <td>
                  {transaction.currency} {transaction.balance}
                </td>
              </tr>
              {openTransactionIndex === index && (
                <tr>
                  <td className="colspan" colSpan={5}>
                    <TransactionDetails transaction={transaction} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
};
