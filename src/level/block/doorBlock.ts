import { Bullet, Entity, Item, Level, OgreEntity, Player, SolidBlock, Sound } from "../../module";

export class DoorBlock extends SolidBlock {
  public open = false;
  public openness = 0;

  constructor() {
    super();
    this.tex = 4;
    this.solidRender = false;
  }

  public use(_level: Level, _item: Item): boolean {
    this.open = !this.open;
    if (this.open) Sound.click1().play();
    else Sound.click2().play();
    return true;
  }

  public tick(): void {
    super.tick();

    if (this.open) this.openness += 0.2;
    else this.openness -= 0.2;
    if (this.openness < 0) this.openness = 0;
    if (this.openness > 1) this.openness = 1;

    const openLimit = 7 / 8.0;
    if (this.openness < openLimit && !this.open && !this.blocksMotion) {
      if (this.level.containsBlockingEntity(this.x - 0.5, this.y - 0.5, this.x + 0.5, this.y + 0.5)) {
        this.openness = openLimit;
        return;
      }
    }

    this.blocksMotion = this.openness < openLimit;
  }

  public blocks(entity: Entity): boolean {
    const openLimit = 7 / 8.0;
    if (this.openness >= openLimit && entity instanceof Player) return this.blocksMotion;
    if (this.openness >= openLimit && entity instanceof Bullet) return this.blocksMotion;
    if (this.openness >= openLimit && entity instanceof OgreEntity) return this.blocksMotion;
    return true;
  }
}