// Import modules
import { GameObject } from "./Gameobject.js";
import { Input } from "./Input.js";
import { Physics } from "./Physics.js";
import { Renderer } from "./Renderer.js";
import { Game } from "./Engine.js";

// Create Bird class that extends GameObject
class Bird extends GameObject {
  constructor(x, y, width, height, imageSrc) {
    super(x, y, width, height, "bird", imageSrc);
    this.velocityY = 0;
  }

  update() {
    // Apply gravity
    this.velocityY += 0.5;
    this.y += this.velocityY;

    //change angle of bird to make it look like it is falling. -90 is straight down
    //dont make it indefinitely dependant on velocityY, or else it will keep rotating
    this.angle = Math.min(this.velocityY * 0.05, 90);

    // Check for collision with pipes
    for (const pipe of Game.gameObjects) {
      if (pipe.type === "pipe" && Physics.checkCollision(this, pipe)) {
        Game.stop();
        Renderer.drawText("Game Over", 100, 100, 30, "black", "Arial");
      }
    }

    // Check for input to control the bird
    if (Input.getState().keys["space"] || Input.getState().mouseLeftDown) {
      this.velocityY = -10;
    }
    // Draw score on the screen
    Renderer.drawText(`Score: ${score}`, 30, 30, 20, "black", "Arial");
  }
}

// Create Pipe class that extends GameObject
class Pipe extends GameObject {
  constructor(x, y, width, height, imageSrc) {
    super(x, y, width, height, "pipe", imageSrc);
  }

  update() {
    this.x -= 2; // Move the pipe towards the bird

    // Remove the pipe if it goes off the screen
    if (this.x + this.width < 0) {
      Game.gameObjects.splice(Game.gameObjects.indexOf(this), 1);
    }
  }
}

// Create the bird and add it to the game objects
const bird = new Bird(
  100,
  200,
  50,
  50,
  "https://freepngimg.com/thumb/logo/109941-logo-bird-flappy-free-transparent-image-hq.png"
);
Game.gameObjects.push(bird);

// Start the game loop
Game.start();

// Spawn pipes every 2 seconds
setInterval(() => {
  const pipe = new Pipe(800, Math.random() * 400, 100, 300, "looipe image");
  Game.gameObjects.push(pipe);
}, 2000);

// Update score every 2 seconds
let score = 0;
setInterval(() => {
  score++;
}, 2000);
