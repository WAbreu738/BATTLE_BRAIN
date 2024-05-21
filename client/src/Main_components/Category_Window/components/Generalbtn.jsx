import { NavLink } from "react-router-dom";

const Generalbtn = () => {
  return (
    <NavLink
      to="/battle"
      state={{ category: "general_knowledge" }}
      className="bg-teal-700 text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-teal-900 flex items-center justify-center"
    >
      GENERAL KNOWLEDGE
    </NavLink>
  );
};

export default Generalbtn;
