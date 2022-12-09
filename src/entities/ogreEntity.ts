import { Art, Bullet, EnemyEntity } from "../module";

export class OgreEntity extends EnemyEntity {
  private shootDelay: number;

  constructor(x: number, z: number) {
    super(x, z, (4 * 8) + 2, Art.getCol(0x82A821));
    this.x = x;
    this.z = z;
    this.health = 6;
    this.r = 0.4;
    this.spinSpeed = 0.05;
  }

  protected hurt(xd: number, zd: number): void {
    super.hurt(xd, zd);
    this.shootDelay = 50;
  }

  public tick(): void {
    super.tick();
    if (this.shootDelay > 0) this.shootDelay--;
    else if (EnemyEntity.random.nextInt(40) === 0) {
      this.shootDelay = 40;
      this.level.addEntity(new Bullet(this, this.x, this.z, Math.atan2(this.level.player.x - this.x, this.level.player.z - this.z), 0.3, 1, this.defaultColor));
    }
  }
}
