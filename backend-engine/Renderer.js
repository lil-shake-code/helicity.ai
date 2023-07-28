// Renderer.js
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

class RendererClass {
  constructor() {
    this.canvas = document.getElementById("myCanvas");
    //change canvas size to 500 by 500
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    //set a background image for the canvas
    this.background = new Image();
    this.background.src = "";
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    if (this.background.src === "") return;
    if (this.background.loaded === false) return;
    this.context.drawImage(
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  drawImage(image, x, y, width, height, angle, alpha) {
    //draw an image on the cavas at x, y with width and height and rotation angle and alpha
    //origin is not at the center of the image, but at the top left corner
    //image is an instance of Image
    if (image) {
      if (image.loaded === false) return;
      this.context.save();
      this.context.translate(x, y);
      this.context.rotate(-angle);
      this.context.globalAlpha = alpha;

      this.context.drawImage(image, 0, 0, width, height);
      this.context.restore();
    }
  }

  drawBlock(color, x, y, width, height, angle, alpha) {
    //draw a block on the cavas at x, y with width and height and rotation angle and alpha
    this.context.save();
    this.context.translate(x, y);
    this.context.rotate(-angle);
    this.context.globalAlpha = alpha;
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, width, height);
    this.context.restore();
  }

  drawText(text, x, y, size, color = "black", font = "Arial") {
    this.context.font = `${size}px ${font}`;
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
  }

  setBackground(query) {
    //if renderer has a "lookup:" in the src of the background image, call the lookup function
    if (query.includes("lookup:")) {
      var requestedQuery = query.split("lookup:")[1];
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
          userPrompt: requestedQuery,
        })
      );

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          //console.log(xhr.responseText);

          //get the imageURL from the response
          var imageURL = JSON.parse(xhr.responseText).image_url;
          this.background = new Image();
          this.background.src = imageURL;
          this.background.onload = () => {
            this.background.loaded = true;
          };
          this.background.onerror = () => {
            console.error(`Error loading background image ${query}`);
          };
        }
      };
    } else {
      this.background = new Image();
      this.background.src = query;
      this.background.onload = () => {
        this.background.loaded = true;
      };
      this.background.onerror = () => {
        console.error(`Error loading background image ${query}`);
      };
    }
  }
}

export const Renderer = new RendererClass(); // Exporting an instance of the Renderer
