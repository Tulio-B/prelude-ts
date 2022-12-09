import { Art, BatEntity, EnemyEntity, KeyEntity, Sound } from "../module";

export class BatBossEntity extends EnemyEntity {
  constructor(x: number, z: number) {
    super(x, z, 4 * 8, Art.getCol(0xffff00));
    this.x = x;
    this.z = z;
    this.health = 5;
    this.r = 0.3;

    this.flying = true;
  }

  protected die(): void {
    Sound.bosskill().play();
    this.level.addEntity(new KeyEntity(this.x, this.z));
  }

  public tick(): void {
    super.tick();
    if (EnemyEntity.random.nextInt(20) === 0) {
      const xx = this.x + ((Math.random() - 0.5) * 2);
      const zz = this.z + ((Math.random() - 0.5) * 2);
      const batEntity = new BatEntity(xx, zz);
      batEntity.level = this.level;

      batEntity.x = -999;
      batEntity.z = -999;

      if (batEntity.isFree(xx, zz)) {
        this.level.addEntity(batEntity);
      }
    }
  }
}
