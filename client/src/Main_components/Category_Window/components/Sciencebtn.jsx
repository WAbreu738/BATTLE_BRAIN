import { NavLink } from "react-router-dom";

const Sciencebtn = () => {
  return (
    <NavLink
      to="/battle"
      state={{ category: "science" }}
      className="bg-indigo-700 text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-indigo-900 flex items-center justify-center"
    >
      SCIENCE
    </NavLink>
  );
};

export default Sciencebtn;
