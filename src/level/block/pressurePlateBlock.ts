import { Block, Entity, Sound } from "../../module";

export class PressurePlateBlock extends Block {
  public pressed = false;

  constructor() {
    super();
    this.floorTex = 2;
  }

  public tick(): void {
    super.tick();
    const r = 0.2;
    const steppedOn = this.level.containsBlockingNonFlyingEntity(this.x - r, this.y - r, this.x + r, this.y + r);
    if (steppedOn !== this.pressed) {
      this.pressed = steppedOn;
      if (this.pressed) this.floorTex = 3;
      else this.floorTex = 2;

      this.level.trigger(this.id, this.pressed);
      if (this.pressed) Sound.click1().play();
      else Sound.click2().play();
    }
  }

  public getFloorHeight(_e: Entity): number {
    if (this.pressed) return -0.02;
    return 0.02;
  }
}
