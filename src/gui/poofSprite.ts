import { Sprite } from "../module";

export class PoofSprite extends Sprite {
  public life = 20;

  constructor(x: number, y: number, z: number) {
    super(x, y, z, 5, 0x222222);
  }

  public tick(): void {
    if (this.life-- <= 0) this.removed = true;
  }
}