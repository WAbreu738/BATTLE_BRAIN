import catagories from "../../Buttons.config";
import { useStore } from "../../OptionsProvider";

const SPCategoryBtns = () => {
  const { state, setCategory } = useStore();
  const selectedCategory = state.category;

  const handleCategoryClick = (category) => setCategory(category);

  return (
    <>
      {catagories.map((item, index) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(item.category)}
          className={`${item.color} ${
            item.hover
          } text-white py-4 px-8 rounded-xl text-lg shadow-lg flex items-center justify-center transition ease-in-out hover:scale-105 hover:drop-shadow-lg ${
            item.category === selectedCategory ? item.selected : ""
          }`}
        >
          {item.name}
        </button>
      ))}
    </>
  );
};

export default SPCategoryBtns;
