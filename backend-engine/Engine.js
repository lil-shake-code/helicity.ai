// Engine.js
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

import { Renderer as EngineRenderer } from "./Renderer.js";
import { Input } from "./Input.js";

export class Engine {
  constructor() {
    this.gameObjects = [];
    this.isRunning = false;
    this.lastTime = 0;
  }

  start() {
    this.isRunning = true;
    requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    this.isRunning = false;
  }
  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }

  loop(time) {
    let deltaTime = time - this.lastTime;
    this.lastTime = time;

    // Clear the canvas before rendering the new frame
    EngineRenderer.clear();

    // Update and render game objects
    for (let obj of this.gameObjects) {
      obj.update(deltaTime);
      obj.render();
    }

    // Repeat the game loop
    if (this.isRunning) requestAnimationFrame(this.loop.bind(this));
  }
}

export const Game = new Engine(); // Exporting an instance of the Engine
