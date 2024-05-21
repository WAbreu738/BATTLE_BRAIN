import { NavLink } from "react-router-dom";

const Foodbtn = () => {
  return (
    <NavLink
      to="/battle"
      state={{ category: "food_and_drink" }}
      className="bg-orange-700 text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-orange-900 flex items-center justify-center"
    >
      FOOD
    </NavLink>
  );
};

export default Foodbtn;
