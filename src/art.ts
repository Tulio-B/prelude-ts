import { Bitmap } from "./module";

import floorsImage from "../assets/tex/floors.png";
import fontImage from "../assets/tex/font.png";
import itemsImage from "../assets/tex/items.png";
import logoImage from "../assets/gui/logo.png";
import panelImage from "../assets/tex/gamepanel.png";
import skyImage from "../assets/tex/sky.png";
import spritesImage from "../assets/tex/sprites.png";
import wallsImage from "../assets/tex/walls.png";

export class Art {
  public static walls: Bitmap = new Bitmap(0, 0);
  public static floors: Bitmap = new Bitmap(0, 0);
  public static sprites: Bitmap = new Bitmap(0, 0);
  public static font: Bitmap = new Bitmap(0, 0);
  public static panel: Bitmap = new Bitmap(0, 0);
  public static items: Bitmap = new Bitmap(0, 0);
  public static sky: Bitmap = new Bitmap(0, 0);
  public static logo: Bitmap = new Bitmap(0, 0);

  static {
    Art.loadBitmap(wallsImage).then(image => (Art.walls = image));
    Art.loadBitmap(floorsImage).then(image => (Art.floors = image));
    Art.loadBitmap(spritesImage).then(image => (Art.sprites = image));
    Art.loadBitmap(fontImage).then(image => (Art.font = image));
    Art.loadBitmap(panelImage).then(image => (Art.panel = image));
    Art.loadBitmap(itemsImage).then(image => (Art.items = image));
    Art.loadBitmap(skyImage).then(image => (Art.sky = image));
    Art.loadBitmap(logoImage).then(image => (Art.logo = image));
  }

  public static async loadBitmap(image: string): Promise<Bitmap> {
    const imageElement = new Image();
    const imageCanvas = document.createElement("canvas");
    const imageCtx = imageCanvas.getContext("2d");

    imageElement.src = image;
    await imageElement.decode();

    imageCtx.drawImage(imageElement, 0, 0);
    const bitmap = new Bitmap(imageElement.naturalWidth, imageElement.naturalHeight);
    const data = imageCtx.getImageData(0, 0, imageElement.naturalWidth, imageElement.naturalHeight).data;

    for (let i = 0; i < data.length; i += 4) {
      bitmap.pixels[i / 4] = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];

      let col = (bitmap.pixels[i / 4] & 0xF) >> 2;
      if (bitmap.pixels[i / 4] === 0xFF00FF) col = -1;

      bitmap.pixels[i / 4] = col;
    }

    return bitmap;
  }

  public static getCol(c: number): number {
    let r = (c >> 16) & 0xFF;
    let g = (c >> 8) & 0xFF;
    let b = (c >> 0) & 0xFF;

    r = r * 0x55 / 0xFF;
    g = g * 0x55 / 0xFF;
    b = b * 0x55 / 0xFF;

    return (r << 16) | (g << 8) | b;
  }
}