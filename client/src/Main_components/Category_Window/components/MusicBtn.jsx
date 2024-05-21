import { NavLink } from "react-router-dom";

const Musicbtn = () => {
  return (
    <NavLink
      to="/battle"
      state={{ category: "music" }}
      className="bg-blue-700 text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-blue-900 flex items-center justify-center"
    >
      MUSIC
    </NavLink>
  );
};

export default Musicbtn;
