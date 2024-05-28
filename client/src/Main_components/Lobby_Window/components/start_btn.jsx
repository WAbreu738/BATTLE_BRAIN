import { NavLink } from "react-router-dom";

const StartBtn = () => {
  return (
    <div className="text-center">
      <NavLink
        to="/category"
        className="bg-green-600 text-white py-5 px-6 rounded-xl text-2xl shadow-xl hover:bg-green-500 transition ease-in-out hover:scale-105 hover:drop-shadow-lg"
      >
        START
      </NavLink>
    </div>
  );
};

export default StartBtn;
