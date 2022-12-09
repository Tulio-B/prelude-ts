import { Item, Level, Sprite } from "../module";
import { Random } from "../random";

export class Entity {
  protected static random = new Random(123);
  public sprites: Sprite[] = [];

  public x = 0;
  public z = 0;
  public rot = 0;
  public xa = 0;
  public za = 0;
  public rota = 0;
  public r = 0.4;

  public level: Level;
  public xTileO = -1;
  public zTileO = -1;
  public flying = false;

  private removed = false;

  public updatePos(): void {
    const xTile = Math.trunc(this.x + 0.5);
    const zTile = Math.trunc(this.z + 0.5);
    if (xTile !== this.xTileO || zTile !== this.zTileO) {
      this.level.getBlock(this.xTileO, this.zTileO).removeEntity(this);

      this.xTileO = xTile;
      this.zTileO = zTile;

      if (!this.removed) this.level.getBlock(this.xTileO, this.zTileO).addEntity(this);
    }
  }

  public isRemoved(): boolean {
    return this.removed;
  }

  public remove(): void {
    this.level.getBlock(this.xTileO, this.zTileO).removeEntity(this);
    this.removed = true;
  }

  protected move(): void {
    const xSteps = Math.trunc(Math.abs(this.xa * 100) + 1);
    for (let i = xSteps; i > 0; i--) {
      const xxa = this.xa;
      if (this.isFree(this.x + ((xxa * i) / xSteps), this.z)) {
        this.x += xxa * i / xSteps;
        break;
      } else {
        this.xa = 0;
      }
    }

    const zSteps = Math.trunc(Math.abs(this.za * 100) + 1);
    for (let i = zSteps; i > 0; i--) {
      const zza = this.za;
      if (this.isFree(this.x, this.z + ((zza * i) / zSteps))) {
        this.z += zza * i / zSteps;
        break;
      } else {
        this.za = 0;
      }
    }
  }

  public isFree(xx: number, yy: number): boolean {
    const x0 = Math.trunc(Math.floor(xx + 0.5 - this.r));
    const x1 = Math.trunc(Math.floor(xx + 0.5 + this.r));
    const y0 = Math.trunc(Math.floor(yy + 0.5 - this.r));
    const y1 = Math.trunc(Math.floor(yy + 0.5 + this.r));

    if (this.level.getBlock(x0, y0).blocks(this)) return false;
    if (this.level.getBlock(x1, y0).blocks(this)) return false;
    if (this.level.getBlock(x0, y1).blocks(this)) return false;
    if (this.level.getBlock(x1, y1).blocks(this)) return false;

    const xc = Math.trunc(Math.floor(xx + 0.5));
    const zc = Math.trunc(Math.floor(yy + 0.5));
    const rr = 2;
    for (let z = zc - rr; z <= zc + rr; z++) {
      for (let x = xc - rr; x <= xc + rr; x++) {
        const es = this.level.getBlock(x, z).entities;
        for (let i = 0; i < es.length; i++) {
          const e = es[i];
          if (e === this) continue;

          if (!e.blocks(this, this.x, this.z, this.r) && e.blocks(this, xx, yy, this.r)) {
            e.collide(this);
            this.collide(e);
            return false;
          }
        }
      }
    }
    return true;
  }

  protected collide(_entity: Entity): void {
  }

  public blocks(entity: Entity, x2: number, z2: number, r2: number): boolean {
    //removed nasty circular dependency - "blocks" is already implemented in the Bullet class
    if (this.x + this.r <= x2 - r2) return false;
    if (this.x - this.r >= x2 + r2) return false;

    if (this.z + this.r <= z2 - r2) return false;
    if (this.z - this.r >= z2 + r2) return false;

    return true;
  }

  public contains(x2: number, z2: number): boolean {
    if (this.x + this.r <= x2) return false;
    if (this.x - this.r >= x2) return false;

    if (this.z + this.r <= z2) return false;
    if (this.z - this.r >= z2) return false;

    return true;
  }

  public isInside(x0: number, z0: number, x1: number, z1: number): boolean {
    if (this.x + this.r <= x0) return false;
    if (this.x - this.r >= x1) return false;

    if (this.z + this.r <= z0) return false;
    if (this.z - this.r >= z1) return false;

    return true;
  }

  public use(_source: Entity, _item: Item): boolean {
    return false;
  }

  public tick(): void {
  }
}