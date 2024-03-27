import { Feature, FeatureData } from "../components/Feature";
import { Hero } from "../layout/Hero";

export const Home = () => {
  const features: FeatureData[] = [
    {
      title: "You are our #1 priority",
      src: `${process.env.PUBLIC_URL}/icon-chat.png`,
      alt: "chat icon",
      description:
        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      title: "More savings means higher rates",
      src: `${process.env.PUBLIC_URL}/icon-money.png`,
      alt: "money icon",
      description:
        "The more you save with us, the higher your interest rate will be!",
    },
    {
      title: "Security you can trust",
      src: `${process.env.PUBLIC_URL}/icon-security.png`,
      alt: "security icon",
      description:
        "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];
  return (
    <main>
      <Hero />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature, index) => (
          <Feature key={index} feature={feature} />
        ))}
      </section>
    </main>
  );
};
