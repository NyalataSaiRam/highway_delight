import { Frown } from "lucide-react";

import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen justify-center my-auto flex text-[#6A6A6A]  items-center  text-3xl flex-col">
      <div className="w-40 h-40 ">
        <Frown className="w-full h-full" />
      </div>
      <div className="mt-6 font-medium text-4xl">404</div>
      <div className="mt-6 font-medium text-[#CCCCCC] text-2xl">
        Page not found
      </div>
      <div className="mt-4 font-medium  text-xl">
        The page you are looking for doesn't exist
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-6 text-sm bg-[#FFD643] px-4 py-3 rounded-sm font-medium hover:cursor-pointer"
      >
        Go back to Home page
      </button>
    </div>
  );
};

export default PageNotFound;
