import { Art, Entity, Item, Sound, Sprite } from "../module";

export class BoulderEntity extends Entity {
  public static readonly COLOR = Art.getCol(0xAFA293);
  private sprite: Sprite;
  private rollDist = 0;

  constructor(x: number, z: number) {
    super();
    this.x = x;
    this.z = z;
    this.sprite = new Sprite(0, 0, 0, 16, BoulderEntity.COLOR);
    this.sprites.push(this.sprite);
  }

  public tick(): void {
    this.rollDist += Math.sqrt((this.xa * this.xa) + (this.za * this.za));
    this.sprite.tex = 8 + (Math.trunc(this.rollDist * 4) & 1);
    const xao = this.xa;
    const zao = this.za;
    this.move();
    if (this.xa === 0 && xao !== 0) this.xa = -xao * 0.3;
    if (this.za === 0 && zao !== 0) this.za = -zao * 0.3;
    this.xa *= 0.98;
    this.za *= 0.98;
    if ((this.xa * this.xa) + (this.za * this.za) < 0.0001) {
      this.xa = 0;
      this.za = 0;
    }
  }

  public use(source: Entity, item: Item): boolean {
    if (item !== Item.powerGlove) return false;
    Sound.roll().play();

    this.xa += Math.sin(source.rot) * 0.1;
    this.za += Math.cos(source.rot) * 0.1;
    return true;
  }
}