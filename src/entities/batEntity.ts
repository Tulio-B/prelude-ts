import { Art, EnemyEntity } from "../module";

export class BatEntity extends EnemyEntity {
  constructor(x: number, z: number) {
    super(x, z, 4 * 8, Art.getCol(0x82666E));
    this.x = x;
    this.z = z;
    this.health = 2;
    this.r = 0.3;

    this.flying = true;
  }
}