import { Art, Entity, Player, Sound, Sprite } from "../module";

export class KeyEntity extends Entity {
  public static readonly COLOR = Art.getCol(0x00ffff);
  private sprite: Sprite;
  private y: number;
  private ya: number;

  constructor(x: number, z: number) {
    super();
    this.x = x;
    this.z = z;
    this.y = 0.5;
    this.ya = 0.025;
    this.sprite = new Sprite(0, 0, 0, 16 + 3, KeyEntity.COLOR);
    this.sprites.push(this.sprite);
  }

  public tick(): void {
    this.move();
    this.y += this.ya;
    if (this.y < 0) this.y = 0;
    this.ya -= 0.005;
    this.sprite.y = this.y;
  }

  protected collide(entity: Entity): void {
    if (entity instanceof Player) {
      Sound.key().play();
      (<Player> entity).keys++;
      this.remove();
    }
  }
}
