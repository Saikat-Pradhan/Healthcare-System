import Card from "../components/Card";

const Dashboard = () => {
  const cards = [
    {
      image: "https://sa1s3optim.patientpop.com/assets/images/provider/photos/2610561.jpg",
      title: "BMI Calculator",
      link: "/bmi"
    },
    {
      image: "https://www.genesismedtech.com/wp-content/uploads/2025/03/resized-photo.jpg",
      title: "Heart Disease Predictor",
      link: "/heart"
    },
    {
      image: "https://www.metropolisindia.com/upgrade/blog/upload/25/08/normal-blood-sugar-levels-chart1756392583.webp",
      title: "Diabetes Risk Assessment",
      link: "/diabetes"
    },
  ];

  return (
    <section className="text-gray-600 body-font h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;