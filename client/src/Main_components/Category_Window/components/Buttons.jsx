import { NavLink } from "react-router-dom";

const catagories = [
  { name: "ART", category: "arts_and_literature", color: "bg-yellow-700" },
  { name: "FILM", category: "film_and_tv", color: "bg-red-700" },
  { name: "FOOD", category: "food_and_drink", color: "bg-orange-700" },
  { name: "GEOGRAPHY", category: "geography", color: "bg-teal-700" },
  {
    name: "GENERAL KNOWLEDGE",
    category: "general_knowledge",
    color: "bg-pink-700",
  },
  { name: "HISTORY", category: "history", color: "bg-purple-700" },
  { name: "MUSIC", category: "music", color: "bg-blue-700" },
  { name: "SCIENCE", category: "science", color: "bg-indigo-700" },
  { name: "SPORTS", category: "sport_and_leisure", color: "bg-green-700" },
];

const CategoryBtns = () => {
  return (
    <>
      {catagories.map((item, index) => (
        <NavLink
          to="/battle"
          key={index}
          state={{ category: item.category }}
          className={`${item.color} text-white py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-yellow-900 flex items-center justify-center item`}
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );
};

export default CategoryBtns;
