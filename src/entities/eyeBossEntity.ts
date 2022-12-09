import { Art, EnemyEntity, KeyEntity, Sound } from "../module";

export class EyeBossEntity extends EnemyEntity {
  constructor(x: number, z: number) {
    super(x, z, (4 * 8) + 4, Art.getCol(0xffff00));
    this.x = x;
    this.z = z;
    this.health = 10;
    this.r = 0.3;
    this.runSpeed = 4;
    this.spinSpeed *= 1.5;

    this.flying = true;
  }

  protected die(): void {
    Sound.bosskill().play();
    this.level.addEntity(new KeyEntity(this.x, this.z));
  }
}
