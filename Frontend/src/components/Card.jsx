import { useNavigate } from "react-router-dom";

const Card = ({ image, title, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div
      className="p-4 md:w-1/3 cursor-pointer"
      onClick={handleClick}
    >
      <div className="h-full bg-black border-3 border-green-200 border-opacity-80 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={image}
          alt={title}
        />
        <div className="text-center p-6">
          <p className="text-3xl font-medium text-green-500 mb-3">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;