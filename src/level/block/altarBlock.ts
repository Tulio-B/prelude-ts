import { Art, Block, Entity, GhostBossEntity, GhostEntity, KeyEntity, RubbleSprite, Sound, Sprite } from "../../module";

export class AltarBlock extends Block {
  private filled = false;
  private sprite: Sprite;

  constructor() {
    super();
    this.blocksMotion = true;
    this.sprite = new Sprite(0, 0, 0, 16 + 4, Art.getCol(0xE2FFE4));
    this.addSprite(this.sprite);
  }

  public addEntity(entity: Entity): void {
    super.addEntity(entity);
    if (!this.filled && (entity instanceof GhostEntity || entity instanceof GhostBossEntity)) {
      entity.remove();
      this.filled = true;
      this.blocksMotion = false;
      this.sprite.removed = true;

      for (let i = 0; i < 8; i++) {
        const sprite = new RubbleSprite();
        sprite.col = this.sprite.col;
        this.addSprite(sprite);
      }

      if (entity instanceof GhostBossEntity) {
        this.level.addEntity(new KeyEntity(this.x, this.y));
        Sound.bosskill().play();
      } else {
        Sound.altar().play();
      }
    }
  }

  public blocks(_entity: Entity): boolean {
    return this.blocksMotion;
  }
}
