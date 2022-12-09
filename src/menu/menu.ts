import { Bitmap, Game } from "../module";

export abstract class Menu {
  abstract render(target: Bitmap): void;
  abstract tick(game: Game, up: boolean, down: boolean, left: boolean, right: boolean, use: boolean): void;
}