import GitHub from "./components/GitHub";
import BackBtn from "../BackBtn";
const Settings = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <div className="bg-cyan-600 relative border border-cyan-800 bg-opacity-90 shadow-xl rounded-xl p-8 max-w-lg w-full">
        <GitHub />
        <div className=" absolute -top-5 -left-5">
          <BackBtn />
        </div>
      </div>
    </main>
  );
};

export default Settings;
