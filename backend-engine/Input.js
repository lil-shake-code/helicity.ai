// Input.js
/**
 * 😊👋 Hello, wonderful Open Source Contributor! 👋😊
 *
 * We're so grateful you're here and considering contributing to this project.
 * At Helicity.ai, I've have put in countless hours into creating this game engine, and
 * we're ecstatic to see you're interested in our code.
 *
 * 🌐 But here's the thing: Helicity.ai is not just about the code—it's about the community.
 * It's about providing a space where developers like you can learn, experiment, and create amazing games.
 *
 * 💖 So if you like this project, please consider supporting us by using our main site,
 * Helicity.ai. It's packed with features and a great community that you might find interesting.
 *
 * Remember, open source is not just about the code, it's about the people behind it.
 * Your support helps us continue to maintain and improve this project. We truly appreciate it.
 *
 * 💫 Happy Coding, and may the Force of Open Source be with you! 💫
 *
 * Cheers,
 * The Helicity.ai Team 🚀
 */

export const Input = (() => {
  const keyMap = {
    32: "space",
    87: "w",
    65: "a",
    83: "s",
    68: "d",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  const state = {
    mouseX: 0,
    mouseY: 0,
    mouseLeftDown: false,
    mouseRightDown: false,
    keys: {},
  };

  window.addEventListener("mousemove", (event) => {
    state.mouseX = event.clientX;
    state.mouseY = event.clientY;
  });

  window.addEventListener("mousedown", (event) => {
    switch (event.button) {
      case 0:
        state.mouseLeftDown = true;
        break;
      case 2:
        state.mouseRightDown = true;
        break;
    }
  });

  window.addEventListener("mouseup", (event) => {
    switch (event.button) {
      case 0:
        state.mouseLeftDown = false;
        break;
      case 2:
        state.mouseRightDown = false;
        break;
    }
  });

  window.addEventListener("keydown", (event) => {
    const keyName = keyMap[event.keyCode];
    if (keyName) {
      state.keys[keyName] = true;
    }
  });

  window.addEventListener("keyup", (event) => {
    const keyName = keyMap[event.keyCode];
    if (keyName) {
      state.keys[keyName] = false;
    }
  });

  return {
    getState: () => state,
  };
})();
