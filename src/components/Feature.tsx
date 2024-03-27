export interface FeatureData {
  title: string;
  src: string;
  alt: string;
  description: string;
}

export const Feature = ({ data }: { data: FeatureData }) => {
  return (
    <div className="feature">
      <img className="feature__icon" src={data.src} alt={data.alt} />
      <h3 className="feature__title">{data.title}</h3>
      <p>{data.description}</p>
    </div>
  );
};
