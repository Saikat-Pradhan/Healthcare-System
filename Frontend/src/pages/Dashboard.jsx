import Card from "../components/Card";
import { toast } from "react-toastify";
import { useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const toastShown = useRef(false);

  useEffect(() => {
    if (location.state?.message && !toastShown.current) {
      toastShown.current = true;
      const { message, type } = location.state;
      type === "success" ? toast.success(message) : toast.error(message);
    }
  }, [location.state]);

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
    <section className="h-screen overflow-scroll text-gray-600 body-font">
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