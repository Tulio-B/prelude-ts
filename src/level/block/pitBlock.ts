import { Block, BoulderEntity, Entity, Sound, Sprite } from "../../module";

export class PitBlock extends Block {
  private filled = false;

  constructor() {
    super();
    this.floorTex = 1;
    this.blocksMotion = true;
  }

  public addEntity(entity: Entity): void {
    super.addEntity(entity);
    if (!this.filled && entity instanceof BoulderEntity) {
      entity.remove();
      this.filled = true;
      this.blocksMotion = false;
      this.addSprite(new Sprite(0, 0, 0, 8 + 2, BoulderEntity.COLOR));
      Sound.thud().play();
    }
  }

  public blocks(entity: Entity): boolean {
    if (entity instanceof BoulderEntity) return false;
    return this.blocksMotion;
  }
}