import { Renderer as EngineRenderer } from "./Renderer.js";
import { Input } from "./Input.js";

export class Engine {
  constructor() {
    this.gameObjects = [];
    this.isRunning = false;
    this.lastTime = performance.now(); // Use performance.now() for accurate time measurement
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

  loop(currentTime) {
    const deltaTime = currentTime - this.lastTime; // Calculate deltaTime

    // Clear the canvas before rendering the new frame
    EngineRenderer.clear();

    // Draw the background
    EngineRenderer.drawBackground();

    // Update and render game objects
    for (let obj of this.gameObjects) {
      obj.update(deltaTime);
      obj.render();
    }

    // Update the lastTime for the next frame
    this.lastTime = currentTime;

    // Repeat the game loop
    if (this.isRunning) requestAnimationFrame(this.loop.bind(this));
  }
}

export const Game = new Engine(); // Exporting an instance of the Engine
