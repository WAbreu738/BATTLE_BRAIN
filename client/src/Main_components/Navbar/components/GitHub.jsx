import { UserCircleIcon } from "@heroicons/react/24/outline";
import GitHubIcon from "../../../assets/images/github-mark-white.png";
import donate from "../../../assets/images/DONATE.png";

export default function GitHub() {
  return (
    <div className="">
      <h1 className="text-xl font-bold mb-2">Created By:</h1>
      <a
        href="https://github.com/TIrwin19"
        className="flex items-center hover:underline hover:font-bold"
      >
        <img src={GitHubIcon} className="h-6 w-6 m-2 text-white-900" />
        <h2 className="text-lg">Trevor Irwin</h2>
      </a>
      <a
        href="https://github.com/tarikorg"
        className="flex items-center hover:underline hover:font-bold"
      >
        <img src={GitHubIcon} className="h-6 w-6 m-2 text-white-900" />
        <h2 className="text-lg">Muhsin Tarik Orgerim</h2>
      </a>
      <a
        href="https://github.com/WAbreu738"
        className="flex items-center hover:underline hover:font-bold"
      >
        <img src={GitHubIcon} className="h-6 w-6 m-2 text-white-900" />
        <h2 className="text-lg">Wesley Abreu</h2>
      </a>
      <a
        href="https://github.com/ThStranick15"
        className="flex items-center hover:underline hover:font-bold"
      >
        <img src={GitHubIcon} className="h-6 w-6 m-2 text-white-900" />
        <h2 className="text-lg">Thomas Stranick</h2>
      </a>
      <a
        href="https://github.com/Neppit"
        className="flex items-center hover:underline hover:font-bold"
      >
        <img src={GitHubIcon} className="h-6 w-6 m-2 text-white-900" />
        <h2 className="text-lg">Alice Ayres</h2>
      </a>
      <a
        href="https://donate.stripe.com/test_bIY8zygLg0E2a6Q7ss"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-wiggle animate-infinite animate-ease-out absolute -top-5 md:-right-9 -right-5 bg-gray-900 text-white border border-white rounded-xl shadow-lg transition ease-in-out hover:scale-25 md:w-40 w-32 hover:drop-shadow-lg"
      >
        <img src={donate} />
      </a>
    </div>
  );
}
