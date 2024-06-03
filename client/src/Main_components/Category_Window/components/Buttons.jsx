import catagories from "../../Buttons.config";
import { useStore } from "../../OptionsProvider";

const CategoryBtns = (props) => {
  const { state, setCategory } = useStore();
  const selectedCategory = state.category;

  const handleCategoryClick = (category) => setCategory(category);

  return (
    <>
      {catagories.map((item, index) => (
        <button
          disabled={props.isPlayerTwo}
          key={index}
          // state={{ category: item.category }}
          onClick={() => handleCategoryClick(item.category)}
          className={`${item.color} ${
            item.hover
          } rounded-xl text-lg shadow-lg flex items-center justify-center transition ease-in-out hover:scale-105 hover:drop-shadow-lg h-20 ${
            item.category === selectedCategory ? item.selected : ""
          }`}
        >
          <img src={item.image} />
        </button>
      ))}
    </>
  );
};

export default CategoryBtns;
