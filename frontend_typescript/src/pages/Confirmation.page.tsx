import confirm from "/confirm.svg";
import { useNavigate, useParams } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img src={confirm} className="w-20 h-20 mt-20" />
      <p className="font-medium text-[32px] leading-40px mt-8">
        Booking Confirmed
      </p>
      <p className="text-[20px] leading-6 text-[#656565] mt-4">Ref ID: {id}</p>
      <button
        onClick={() => navigate("/")}
        className="flex items-center justify-center rounded-sm py-2 px-4 bg-[#E3E3E3] mt-10 hover:cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Confirmation;
