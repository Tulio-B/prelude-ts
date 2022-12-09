import { Art, Bullet, EnemyEntity, KeyEntity, Sound } from "../module";

export class BossOgre extends EnemyEntity {
  private shootDelay = 0;
  private shootPhase = 0;

  constructor(x: number, z: number) {
    super(x, z, (4 * 8) + 2, Art.getCol(0xffff00));
    this.x = x;
    this.z = z;
    this.health = 10;
    this.r = 0.4;
    this.spinSpeed = 0.05;
  }

  protected die(): void {
    Sound.bosskill().play();
    this.level.addEntity(new KeyEntity(this.x, this.z));
  }

  public tick(): void {
    super.tick();
    if (this.shootDelay > 0) this.shootDelay--;
    else {
      this.shootDelay = 5;
      const salva = 10;

      for (let i = 0; i < 4; i++) {
        const rot = Math.PI / 2 * (i + (((this.shootPhase / salva) % 2) * 0.5));
        this.level.addEntity(new Bullet(this, this.x, this.z, rot, 0.4, 1, this.defaultColor));
      }

      this.shootPhase++;
      if (this.shootPhase % salva === 0) this.shootDelay = 40;
    }
  }
}