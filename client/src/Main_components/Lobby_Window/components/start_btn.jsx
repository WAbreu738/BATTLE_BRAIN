import { NavLink } from "react-router-dom";
import { useStore } from "../../OptionsProvider";
import start from "../../../assets/images/START.png";

const StartBtn = () => {
  const { state } = useStore();

  return (
    <div className="flex justify-center transition ease-in-out hover:scale-105 hover:drop-shadow-lg w-fit mx-auto">
      <NavLink
        to={`/category/${state.roomcode}`}
        className="bg-cyan-950 rounded-xl shadow-md transition ease-in-out hover:scale-105 hover:drop-shadow-lg max-w-52 hover:animate-pulse"
      >
        <img src={start} />
      </NavLink>
    </div>
  );
};

export default StartBtn;
