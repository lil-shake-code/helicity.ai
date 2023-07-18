import { GameObject } from "./Gameobject.js";
import { Game } from "./Engine.js";
import { Renderer } from "./Renderer.js";
import RigidBody from "./rigidbody.js";
import Vector2 from "./vector2.js";
import { Input } from "./Input.js";

// Create a custom game object that extends the GameObject class
class CustomGameObject extends GameObject {
  constructor(x, y, width, height, type, imageSrc) {
    super(x, y, width, height, type, imageSrc);
  }

  update(deltaTime) {
    const movementDistance = 0.4 * (deltaTime / 1000);

    const force = new Vector2(5, 0).multiply(movementDistance);

    // Apply force based on user input
    if (Input.getState().keys["left"]) {
      this.rigidbody.applyForce(force);
    }
    if (Input.getState().keys["right"]) {
      this.rigidbody.applyForce(force.multiply(-1)); // Apply force in the opposite direction
    }

    // Update the rigidbody and position
    this.rigidbody.update();
    this.x = this.rigidbody.position.x;
    this.y = this.rigidbody.position.y;

    // Call the parent's update method
    super.update(deltaTime);
  }
}

// Create an instance of the CustomGameObject
const customObject = new CustomGameObject(
  100,
  100,
  50,
  50,
  "custom",
  "https://freepngimg.com/thumb/logo/109941-logo-bird-flappy-free-transparent-image-hq.png"
);

// Start the game engine
Game.start();
