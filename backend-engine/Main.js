// Import modules
import { GameObject } from "./Gameobject.js";
import { Input } from "./Input.js";
import { Physics } from "./Physics.js";
import { Renderer } from "./Renderer.js";
import { Game } from "./Engine.js";
//Set bg
Renderer.background.src =
  "data:image/jpeg;base64,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";
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

// Start the game loop
Game.start();

// Spawn pipes every 2 seconds
setInterval(() => {
  const pipe = new Pipe(
    800,
    Math.random() * 400,
    100,
    300,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmKi_2I9_OzgnyqC49KN4dFNGhe7n50G4QSw&usqp=CAU"
  );
}, 2000);

// Update score every 2 seconds
let score = 0;
setInterval(() => {
  score++;
}, 2000);
