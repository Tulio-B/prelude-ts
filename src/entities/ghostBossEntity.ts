import { Art, Bullet, EnemyEntity, Entity } from "../module";

export class GhostBossEntity extends EnemyEntity {
  private rotatePos = 0;
  private shootDelay = 0;

  constructor(x: number, z: number) {
    super(x, z, (4 * 8) + 6, Art.getCol(0xffff00));
    this.x = x;
    this.z = z;
    this.health = 10;
    this.flying = true;
  }

  public tick(): void {
    this.animTime++;
    this.sprite.tex = this.defaultTex + (Math.trunc(this.animTime / 10) % 2);

    let xd = (this.level.player.x + (Math.sin(this.rotatePos) * 2)) - this.x;
    let zd = (this.level.player.z + (Math.cos(this.rotatePos) * 2)) - this.z;
    let dd = (xd * xd) + (zd * zd);

    if (dd < 1) {
      this.rotatePos += 0.04;
    } else {
      this.rotatePos = this.level.player.rot;
    }
    if (dd < 4 * 4) {
      dd = Math.sqrt(dd);

      xd /= dd;
      zd /= dd;

      this.xa += xd * 0.006;
      this.za += zd * 0.006;

      if (this.shootDelay > 0) this.shootDelay--;
      else if (Entity.random.nextInt(10) === 0) {
        this.shootDelay = 10;
        this.level.addEntity(new Bullet(this, this.x, this.z, Math.atan2(this.level.player.x - this.x, this.level.player.z - this.z), 0.20, 1, this.defaultColor));
      }
    }

    this.move();

    this.xa *= 0.9;
    this.za *= 0.9;
  }

  protected hurt(_xd: number, _zd: number): void {
  }

  protected move(): void {
    this.x += this.xa;
    this.z += this.za;
  }
}