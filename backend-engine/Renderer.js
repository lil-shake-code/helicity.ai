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
    //change canvas size to 1280x720
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.context = this.canvas.getContext("2d");
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImage(image, x, y, width, height, angle, alpha) {
    //draw an image on the cavas at x, y with width and height and rotation angle and alpha
    //origin is not at the center of the image, but at the top left corner
    this.context.save();
    this.context.translate(x, y);
    this.context.rotate(-angle);
    this.context.globalAlpha = alpha;

    this.context.drawImage(image, 0, 0, width, height);
    this.context.restore();
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
}

export const Renderer = new RendererClass(); // Exporting an instance of the Renderer
