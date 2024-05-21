import { NavLink } from "react-router-dom";

const Sportbtn = () => {
  return (
    <NavLink
      to="/battle"
      state={{ category: "sport_and_leisure" }}
      className="bg-green-700 text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-green-900 flex items-center justify-center"
    >
      SPORT
    </NavLink>
  );
};

export default Sportbtn;
