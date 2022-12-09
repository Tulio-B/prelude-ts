import { Art, Block, Entity, Player, Sound, Sprite } from "../../module";

export class LootBlock extends Block {
  private taken = false;
  private sprite: Sprite;

  constructor() {
    super();
    this.sprite = new Sprite(0, 0, 0, 16 + 2, Art.getCol(0xffff80));
    this.addSprite(this.sprite);
    this.blocksMotion = true;
  }

  public addEntity(entity: Entity): void {
    super.addEntity(entity);
    if (!this.taken && entity instanceof Player) {
      this.sprite.removed = true;
      this.taken = true;
      this.blocksMotion = false;
      (<Player> entity).loot++;
      Sound.pickup().play();
    }
  }

  public blocks(entity: Entity): boolean {
    if (entity instanceof Player) return false;
    return this.blocksMotion;
  }
}