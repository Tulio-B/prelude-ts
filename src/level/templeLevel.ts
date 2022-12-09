import { Item, Level } from "../module";

export class TempleLevel extends Level {
  private triggerMask = 0;

  constructor() {
    super();
    this.floorCol = 0x8A6496;
    this.ceilCol = 0x8A6496;
    this.wallCol = 0xCFADDB;
    this.name = "The Temple";
  }

  public switchLevel(id: number): void {
    if (id === 1) this.game.switchLevel("overworld", 3);
  }

  public getLoot(id: number): void {
    super.getLoot(id);
    if (id === 1) this.game.getLoot(Item.skates);
  }

  public trigger(id: number, pressed: boolean): void {
    this.triggerMask |= 1 << id;
    if (!pressed) this.triggerMask ^= 1 << id;

    if (this.triggerMask === 14) {
      super.trigger(1, true);
    } else {
      super.trigger(1, false);
    }
  }
}