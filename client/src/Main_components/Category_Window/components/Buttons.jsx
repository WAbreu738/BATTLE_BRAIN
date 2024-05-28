import { NavLink } from "react-router-dom";
import catagories from "../../Buttons.config";

const CategoryBtns = () => {
  return (
    <>
      {catagories.map((item, index) => (
        <NavLink
          to="/battle"
          key={index}
          state={{ category: item.category }}
          className={`${item.color} ${item.hover} text-white py-4 px-8 rounded-xl text-lg shadow-lg flex items-center justify-center transition ease-in-out hover:scale-105 hover:drop-shadow-lg`}
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );
};

export default CategoryBtns;
