import { Art, EnemyEntity } from "../module";

export class GhostEntity extends EnemyEntity {
  private rotatePos = 0;

  constructor(x: number, z: number) {
    super(x, z, (4 * 8) + 6, Art.getCol(0xffffff));
    this.x = x;
    this.z = z;
    this.health = 4;
    this.r = 0.3;

    this.flying = true;
  }

  public tick(): void {
    this.animTime++;
    this.sprite.tex = this.defaultTex + (Math.trunc(this.animTime / 10) % 2);

    let xd = (this.level.player.x + Math.sin(this.rotatePos)) - this.x;
    let zd = (this.level.player.z + Math.cos(this.rotatePos)) - this.z;
    let dd = (xd * xd) + (zd * zd);

    if (dd < 4 * 4) {
      if (dd < 1) {
        this.rotatePos += 0.04;
      } else {
        this.rotatePos = this.level.player.rot;
        this.xa += (Math.random() - 0.5) * 0.02;
        this.za += (Math.random() - 0.5) * 0.02;
      }

      dd = Math.sqrt(dd);

      xd /= dd;
      zd /= dd;

      this.xa += xd * 0.004;
      this.za += zd * 0.004;
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