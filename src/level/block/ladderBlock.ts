import { Art, Block, Entity, Player, Sound, Sprite } from "../../module";

export class LadderBlock extends Block {
  private static readonly LADDER_COLOR = 0xDB8E53;
  public wait: boolean;

  constructor(down: boolean) {
    super();
    if (down) {
      this.floorTex = 1;
      this.addSprite(new Sprite(0, 0, 0, 8 + 3, Art.getCol(LadderBlock.LADDER_COLOR)));
    } else {
      this.ceilTex = 1;
      this.addSprite(new Sprite(0, 0, 0, 8 + 4, Art.getCol(LadderBlock.LADDER_COLOR)));
    }
  }

  public removeEntity(entity: Entity): void {
    super.removeEntity(entity);
    if (entity instanceof Player) {
      this.wait = false;
    }
  }

  public addEntity(entity: Entity): void {
    super.addEntity(entity);

    if (!this.wait && entity instanceof Player) {
      this.level.switchLevel(this.id);
      Sound.ladder().play();
    }
  }
}
