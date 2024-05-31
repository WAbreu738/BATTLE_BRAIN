import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import GitHubIcon from "../../../assets/images/github-mark.png";
import { NavLink } from "react-router-dom";

export default function SettingsBtn() {
  return (
    <div className="border border-zinc-900 bg-gray-100 rounded-full transition ease-in-out hover:scale-105 hover:drop-shadow-lg w-fit h-fit">
      <NavLink to="/settings">
        <img src={GitHubIcon} className=" h-8 w-8 m-1 text-zinc-900" />
      </NavLink>
    </div>
  );
}
