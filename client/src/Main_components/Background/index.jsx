// import "../App.css";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import config from "./background.config";

const Background = () => {
  // let amount = 50;
  // const html = () => {
  //   let output = [];
  //   while (amount--) output.push(<span key={amount}></span>);
  //   return output;
  // };

  // return <div class="background">{html()}</div>;

  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(() => config, []);

  if (init) {
    return (
      <Particles
        className=" absolute -z-10"
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default Background;
