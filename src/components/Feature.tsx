export interface FeatureData {
  title: string;
  src: string;
  alt: string;
  description: string;
}

export const Feature = ({ feature }: { feature: FeatureData }) => {
  return (
    <div className="feature">
      <img className="feature__icon" src={feature.src} alt={feature.alt} />
      <h3 className="feature__title">{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
};
