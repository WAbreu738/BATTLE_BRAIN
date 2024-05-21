import { NavLink } from "react-router-dom";

const Historybtn = () => {
  return (
    <NavLink
      to="/battle"
      state={{ category: "history" }}
      className="bg-purple-700 text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-purple-900 flex items-center justify-center"
    >
      HISTORY
    </NavLink>
  );
};

export default Historybtn;
