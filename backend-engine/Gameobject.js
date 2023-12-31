// GameObject.js
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

import { Game } from "./Engine.js";
import { Renderer } from "./Renderer.js";
import RigidBody from "./rigidbody.js";
import Vector2 from "./vector2.js";

var savedImages = {};

export class GameObject {
  xscale = 1;
  yscale = 1;
  alpha = 1;
  constructor(x, y, width, height, type, imageSrc, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    //if type arguemnt is not provided, set it to "default"
    if (type == undefined) {
      type = "default";
    }
    //if imageSrc arguemnt is not provided, set it to ""
    if (imageSrc == undefined) {
      imageSrc = "";
    }
    //if angle arguemnt is not provided, set it to 0
    if (angle == undefined) {
      angle = 0;
    }
    this.angle = angle;
    this.type = type; // can be Used for collision detection
    this.image = new Image();
    this.image.loaded = false;

    //check if imagesrc contains the string lookup:
    if (imageSrc.includes("lookup:")) {
      //check if the image is already saved
      if (savedImages[imageSrc]) {
        this.image = savedImages[imageSrc];
        this.image.loaded = true;
      } else {
        //make a post request. this is in html to use XMLHttpRequest
        var xhr = new XMLHttpRequest();
        xhr.open(
          "POST",
          "https://us-central1-ai-game-maker.cloudfunctions.net/api/Image",
          true
        );
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify({
            userPrompt: imageSrc.split("lookup:")[1],
          })
        );
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            //console.log(xhr.responseText);

            //get the imageURL from the response
            var imageURL = JSON.parse(xhr.responseText).image_url;
            this.image = new Image();
            this.image.src = imageURL;
            this.image.onload = () => {
              this.image.loaded = true;
              //save the image
              savedImages[imageSrc] = this.image;
            };
            this.image.onerror = () => {
              console.error(`Error loading image ${this.imageSrc}`);
            };
          }
        };
      }
    } else {
      this.imageSrc = imageSrc;
      if (this.imageSrc) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onerror = () => {
          console.error(`Error loading image in Game Object ${this.imageSrc}`);
        };
        this.image.onload = () => {
          this.image.loaded = true;
        };
      }
    }
    // Initialize the Rigidbody
    this.rigidbody = new RigidBody(new Vector2(x, y), new Vector2(0, 0), 1);

    Game.addGameObject(this);
  }

  update(deltaTime) {
    // Overridden by child classes

    const { position, velocity } = this.rigidbody;
    position.x = this.x;
    position.y = this.y;
  }

  render() {
    if (this.image.loaded) {
      Renderer.drawImage(
        this.image,
        this.x,
        this.y,
        this.width * this.xscale,
        this.height * this.yscale,
        (-this.angle * Math.PI) / 180,
        this.alpha
      );
    } else {
      //draw a black rectangle with   xscale yscale at the right angle and alpha
      Renderer.drawBlock(
        "black",
        this.x,
        this.y,
        this.width * this.xscale,
        this.height * this.yscale,
        (-this.angle * Math.PI) / 180,
        this.alpha
      );
    }
  }
}
