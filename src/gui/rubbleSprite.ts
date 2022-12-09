import { Sprite } from "../module";

export class RubbleSprite extends Sprite {
  private xa: number;
  private ya: number;
  private za: number;

  constructor() {
    super(Math.random() - 0.5, Math.random() * 0.8, Math.random() - 0.5, 2, 0x555555);
    this.xa = Math.random() - 0.5;
    this.ya = Math.random();
    this.za = Math.random() - 0.5;
  }

  public tick(): void {
    this.x += this.xa * 0.03;
    this.y += this.ya * 0.03;
    this.z += this.za * 0.03;
    this.ya -= 0.1;

    if (this.y < 0) {
      this.y = 0;
      this.xa *= 0.8;
      this.za *= 0.8;

      if (Math.random() < 0.04) this.removed = true;
    }
  }
}