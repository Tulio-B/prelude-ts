import { Game, Item, Level } from "../module";

export class DungeonLevel extends Level {
  constructor() {
    super();
    this.wallCol = 0xC64954;
    this.floorCol = 0x8E4A51;
    this.ceilCol = 0x8E4A51;
    this.name = "The Dungeons";
  }

  public init(game: Game, name: string, w: number, h: number, pixels: number[]): void {
    super.init(game, name, w, h, pixels);
    super.trigger(6, true);
    super.trigger(7, true);
  }

  public switchLevel(id: number): void {
    if (id === 1) this.game.switchLevel("start", 2);
  }

  public getLoot(id: number): void {
    super.getLoot(id);
    if (id === 1) this.game.getLoot(Item.powerGlove);
  }

  public trigger(id: number, pressed: boolean): void {
    super.trigger(id, pressed);
    if (id === 5) super.trigger(6, !pressed);
    if (id === 4) super.trigger(7, !pressed);
  }
}