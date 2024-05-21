import { NavLink } from "react-router-dom";

const Artbtn = () => {
  return (
    <NavLink
      to="/battle"
      state={{ category: "arts_and_literature" }}
      className="bg-yellow-700 text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-yellow-900 flex items-center justify-center"
    >
      ART
    </NavLink>
  );
};

export default Artbtn;
