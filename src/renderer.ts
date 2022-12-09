import type { Screen } from "./module";

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: ImageData;

  private width: number;
  private height: number;
  private scale: number;

  constructor(width: number, height: number, scale: number) {
    this.width = width;
    this.height = height;
    this.scale = scale;

    this.canvas = <HTMLCanvasElement>document.getElementById("game");
    this.canvas.width = this.width * scale;
    this.canvas.height = this.height * scale;

    this.ctx = this.canvas.getContext("2d");
    this.image = this.ctx.createImageData(this.width, this.height);
  }

  public drawScreen(screen: Screen) {
    for (let i = 0; i < screen.pixels.length; i++) {
      this.image.data.set([(screen.pixels[i] & 0xFF0000) >> 16, (screen.pixels[i] & 0xFF00) >> 8, screen.pixels[i] & 0xFF, 0xFF], i * 4);
    }

    this.render();
  }

  public render() {
    const scaled = this.ctx.createImageData(this.image.width * this.scale, this.image.height * this.scale);
    const subImage = this.ctx.createImageData(this.scale, 1).data;

    for (let y = 0; y < this.image.height; y++) {
      for (let x = 0; x < this.image.width; x++) {
        const sourcePixel = this.image.data.subarray(((y * this.image.width) + x) * 4, (((y * this.image.width) + x) * 4) + 4);
        for (let xx = 0; xx < this.scale; xx++) subImage.set(sourcePixel, xx * 4);
        for (let yy = 0; yy < this.scale; yy++) {
          const destY = (y * this.scale) + yy;
          const destX = x * this.scale;
          scaled.data.set(subImage, ((destY * scaled.width) + destX) * 4);
        }
      }
    }

    this.ctx.putImageData(scaled, 0, 0);
  }
}