import art from "../assets/images/ART.png";
import film from "../assets/images/FILM.png";
import food from "../assets/images/FOOD.png";
import geography from "../assets/images/GEOGRAPHY.png";
import generalknowledge from "../assets/images/GENERAL.png";
import history from "../assets/images/HISTORY.png";
import music from "../assets/images/MUSIC.png";
import science from "../assets/images/SCIENCE.png";
import sports from "../assets/images/SPORTS.png";


const catagories = [
  {
    name: "ART",
    category: "arts_and_literature",
    color: "bg-cyan-950 md:p-8 p-6",
    hover: "hover:bg-yellow-700",
    selected: "bg-yellow-700 scale-105 drop-shadow-lg border border-gray-100",
    image: art,
  },
  {
    name: "FILM",
    category: "film_and_tv",
    color: "bg-cyan-950 md:p-7 p-5",
    hover: "hover:bg-red-800",
    selected: "bg-red-700 scale-105 drop-shadow-lg border border-gray-100",
    image: film,
  },
  {
    name: "FOOD",
    category: "food_and_drink",
    color: "bg-cyan-950 md:p-6 p-4",
    hover: "hover:bg-orange-800",
    selected: "bg-orange-700 scale-105 drop-shadow-lg border border-gray-100",
    image: food,
  },
  {
    name: "GEOGRAPHY",
    category: "geography",
    color: "bg-cyan-950",
    hover: "hover:bg-teal-800",
    selected: "bg-teal-700 scale-105 drop-shadow-lg border border-gray-100",
    image: geography,
  },
  {
    name: "GENERAL KNOWLEDGE",
    category: "general_knowledge",
    color: "bg-cyan-950",
    hover: "hover:bg-rose-900",
    selected: "bg-rose-800 scale-105 drop-shadow-lg border border-gray-100",
    image: generalknowledge,
  },
  {
    name: "HISTORY",
    category: "history",
    color: "bg-cyan-950",
    hover: "hover:bg-purple-800",
    selected: "bg-purple-700 scale-105 drop-shadow-lg border border-gray-100",
    image: history,
  },
  {
    name: "MUSIC",
    category: "music",
    color: "bg-cyan-950 p-4",
    hover: "hover:bg-blue-700",
    selected: "bg-blue-700 scale-105 drop-shadow-lg border border-gray-100",
    image: music,
  },
  {
    name: "SCIENCE",
    category: "science",
    color: "bg-cyan-950",
    hover: "hover:bg-sky-700",
    selected: "bg-indigo-700 scale-105 drop-shadow-lg border border-gray-100",
    image: science,
  },
  {
    name: "SPORTS",
    category: "sport_and_leisure",
    color: "bg-cyan-950",
    hover: "hover:bg-green-700",
    selected: "bg-green-700 scale-105 drop-shadow-lg border border-gray-100",
    image: sports,
  },
];

export default catagories