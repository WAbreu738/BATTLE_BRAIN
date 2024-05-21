import { NavLink } from "react-router-dom";

const Filmbtn = () => {
  return (
    <NavLink
      to="/battle"
      state={{ category: "film_and_tv" }}
      className="bg-red-700 text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-red-900 flex items-center justify-center"
    >
      FILM
    </NavLink>
  );
};

export default Filmbtn;
