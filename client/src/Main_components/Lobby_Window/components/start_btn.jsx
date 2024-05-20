import { NavLink } from "react-router-dom";

const StartBtn = () => {
  return (
    <div className="text-center">
      <NavLink
        to="/battle"
        className="bg-green-500 text-white py-6 px-12 rounded-lg text-2xl shadow-lg hover:bg-green-700"
      >
        START
      </NavLink>
    </div>
  );
};

export default StartBtn;
