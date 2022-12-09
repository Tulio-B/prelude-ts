import { Art, EnemyEntity } from "../module";

export class EyeEntity extends EnemyEntity {
  constructor(x: number, z: number) {
    super(x, z, (4 * 8) + 4, Art.getCol(0x84ECFF));
    this.x = x;
    this.z = z;
    this.health = 4;
    this.r = 0.3;
    this.runSpeed = 2;
    this.spinSpeed *= 1.5;

    this.flying = true;
  }
}
