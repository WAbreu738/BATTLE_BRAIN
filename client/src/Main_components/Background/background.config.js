const config = {
  background: {
    color: {
      value: "#171717",
    },
  },
  fpsLimit: 60,
  interactivity: {
    detect_on: "window",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "grab",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
    },
  },
  particles: {
    color: {
      value: "#ff0059",
    },
    links: {
      enable: true,
      distance: 150,
      color: "#00f7ff",
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: true,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 1025.8919341219544,
      },
      value: 208,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
      polygon: {
        nb_sides: 5,
      },
    },
    size: {
      value: { min: 1, max: 3.5 },
    },
  },
  detectRetina: true,
}

export default config