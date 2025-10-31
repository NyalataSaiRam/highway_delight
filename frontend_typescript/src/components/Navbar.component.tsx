import { useContext, useState } from "react";
import logo from "/logo.png";
import { AppContext } from "../appContext";

const Navbar = () => {
  const { setSearch } = useContext(AppContext);
  const [text, setText] = useState("");

  return (
    <div
      className="
        w-full  bg-[#F9F9F9] shadow-[0_2px_16px_0_#0000001A] sticky top-0 left-0 flex justify-between
        text-[1rem] 
        px-5 py-1  
        md:px-10 ,d:py-2
        lg:px-31 lg:py-4 z-10
      "
    >
      <div
        className="
          w-18
          lg:w-[100px] lg:h-[55px]
        "
      >
        <img src={logo} alt="logo" />
      </div>
      <div
        className="
          flex  text-[.8rem] gap-1 items-center
          lg:gap-4 lg:leading-[18px] lg:text-[14px]
        "
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          name="search"
          className=" 
            bg-[#EDEDED] outline-none rounded-sm px-2 py-1
            lg:py-3 lg:px-4
          "
          placeholder="Search experiences"
        />
        <button
          onClick={() => {
            setSearch(text);
          }}
          className=" 
            placeholder:text-[#727272] bg-[#FFD643]  text-[#161616] font-medium
            px-2 py-1 rounded-sm  
            lg:py-3 lg:px-5 lg:rounded-lg  
          "
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;
