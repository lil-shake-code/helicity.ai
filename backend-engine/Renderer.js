// Renderer.js

export class Rendererr {
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

  drawImage(image, x, y, width, height) {
    this.context.drawImage(image, x, y, width, height);
  }

  drawText(text, x, y, size, color = "black", font = "Arial") {
    this.context.font = `${size}px ${font}`;
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
  }
}

export const Renderer = new Rendererr(); // Exporting an instance of the Renderer
