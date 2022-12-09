import { Item, Level } from "../module";

export class IceLevel extends Level {
  constructor() {
    super();
    this.floorCol = 0xB8DBE0;
    this.ceilCol = 0xB8DBE0;
    this.wallCol = 0x6BE8FF;
    this.name = "The Frost Cave";
  }

  public switchLevel(id: number): void {
    if (id === 1) this.game.switchLevel("overworld", 5);
  }

  public getLoot(id: number): void {
    super.getLoot(id);
    if (id === 1) this.game.getLoot(Item.skates);
  }
}