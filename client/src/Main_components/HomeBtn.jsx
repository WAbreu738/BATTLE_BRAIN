import { HomeIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function HomeBtn() {
  return (
    <NavLink to="/">
      <div className="border border-zinc-900 bg-gray-100 rounded-full transition ease-in-out hover:scale-105 hover:drop-shadow-lg w-fit h-fit">
        <HomeIcon className=" h-6 w-6 m-2 text-zinc-900" />
      </div>
    </NavLink>
  );
}
