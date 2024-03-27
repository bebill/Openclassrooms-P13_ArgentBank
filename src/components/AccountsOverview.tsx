export interface AccountData {
  title: string;
  amount: string;
  description: string;
}

export const Account = ({ data }: { data: AccountData }) => {
  return (
    <section className="account">
      <div className="account__content-wrapper">
        <h3 className="account__title">{data.title}</h3>
        <p className="account__amount">{data.amount}</p>
        <p className="account__amount-description">{data.description}</p>
      </div>
      <div className="account__content-wrapper account__content-wrapper--cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};
