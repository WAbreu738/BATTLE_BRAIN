import { NavLink } from "react-router-dom";

const Geographybtn = () => {
  return (
    <NavLink
      to="/battle"
      state={{ category: "geography" }}
      className="bg-pink-700 text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-pink-900 flex items-center justify-center"
    >
      GEOGRAPHY
    </NavLink>
  );
};

export default Geographybtn;
