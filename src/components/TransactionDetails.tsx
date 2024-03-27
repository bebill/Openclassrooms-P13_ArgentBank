export interface TransactionData {
  date: string;
  description: string;
  currency: string;
  amount: string;
  balance: string;
  transactionType: string;
  category: string;
  note: string;
}

export const TransactionDetails = ({
  transaction,
}: {
  transaction: TransactionData;
}) => {
  return (
    <div className="transaction-details">
      <p>Transaction Type: {transaction.transactionType}</p>
      <p>
        Category: {transaction.category} <i className="fa fa-pencil"></i>
      </p>
      <p>
        Notes: {transaction.note} <i className="fa fa-pencil"></i>
      </p>
    </div>
  );
};
