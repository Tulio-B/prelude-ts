import { Block, Bullet, Entity, Item, Level, Player, Sound, Sprite } from "../../module";

export class BarsBlock extends Block {
  private sprite: Sprite;
  private open = false;

  constructor() {
    super();
    this.sprite = new Sprite(0, 0, 0, 0, 0x202020);
    this.addSprite(this.sprite);
    this.blocksMotion = true;
  }

  public use(level: Level, item: Item): boolean {
    if (this.open) return false;

    if (item === Item.cutters) {
      Sound.cut().play();
      this.sprite.tex = 1;
      this.open = true;
    }

    return true;
  }

  public blocks(entity: Entity): boolean {
    if (this.open && entity instanceof Player) return false;
    if (this.open && entity instanceof Bullet) return false;
    return this.blocksMotion;
  }
}
