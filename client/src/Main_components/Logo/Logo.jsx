import logo from "../../assets/images/BATTLE-BRAIN-5-27-2024 (1).png";

const Logo = () => {
  return (
    <div className="mb-3">
      {/* <h1 className="text-5xl font-bold text-purple-500">BattleBrain</h1> */}
      <img
        className="animate-jump-out animate-once animate-delay-[50ms] animate-ease-in-out animate-alternate-reverse md:w-1/2 w-full m-auto"
        src={logo}
        alt="Battle Brain Logo"
      />
    </div>
  );
};

export default Logo;
