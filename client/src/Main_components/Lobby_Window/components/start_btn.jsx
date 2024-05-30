import { NavLink } from "react-router-dom";

const StartBtn = () => {
  return (
    <div className="flex justify-center transition ease-in-out hover:scale-105 hover:drop-shadow-lg">
      <NavLink
        to="/category"
        className="bg-green-600 text-white py-4 px-5 rounded-xl text-2xl shadow-xl hover:bg-green-500"
      >
        START
      </NavLink>
    </div>
  );
};

export default StartBtn;
