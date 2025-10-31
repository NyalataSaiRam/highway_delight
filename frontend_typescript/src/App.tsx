import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.component";

function App() {
  return (
    <div className="w-full h-full  flex flex-col  font-[Inter] items-center justify-between">
      <Navbar />
      <div className="flex-1  w-full px-5 py-1 md:px-10 md:py-2 lg:px-0 lg:py-0">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
