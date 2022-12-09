import { Item, Level } from "../module";

export class CryptLevel extends Level {
  constructor() {
    super();
    this.floorCol = 0x404040;
    this.ceilCol = 0x404040;
    this.wallCol = 0x404040;
    this.name = "The Crypt";
  }

  public switchLevel(id: number): void {
    if (id === 1) this.game.switchLevel("overworld", 2);
  }

  public getLoot(id: number): void {
    super.getLoot(id);
    if (id === 1) this.game.getLoot(Item.flippers);
  }
}