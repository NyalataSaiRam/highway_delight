import img from "/image.png";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

type CardProps = {
  id: string;
  imageUrl: string;
  title: string;
  location: string;
  place: string;
  description: string;
  price: number;
};

const Card = ({
  id,
  imageUrl = img,
  title,
  location,
  description,
  price,
}: CardProps) => {
  const navigate = useNavigate();

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariant}
      className="w-[280px] mx-auto  rounded-xl flex flex-col text-[#161616]"
    >
      <div className="w-full h-[170px]  rounded-xl ">
        <img
          src={imageUrl}
          alt="image"
          className=" rounded-t-xl w-full object-cover"
        />
      </div>
      <div className="flex flex-col px-4 py-3 gap-5 bg-[#F0F0F0]  rounded-b-xl ">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-medium text-[16px] leading-5 capitalize">
              {title}
            </span>
            <span className="rounded-sm px-2 py-1 bg-[#D6D6D6D6] font-medium text-[11px] leading-4 capitalize">
              {location}
            </span>
          </div>
          <div className="line-clamp-2 leading-4 text-xs text-[#6C6C6C] first-letter:capitalize">
            {description}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-1.5 items-center">
            <span className="text-xs leading-4">From</span>
            <span className="font-medium text-xl leading-6">₹{price}</span>
          </div>
          <button
            onClick={() => navigate(`/details/${id}`)}
            className="bg-[#FFD643] py-1.5 px-2  rounded-sm font-medium text-sm leading-4.5 hover:cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
