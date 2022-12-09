import { Art, Block, Bullet, Entity, Sprite } from "../../module";

export class SpiritWallBlock extends Block {
  constructor() {
    super();
    this.floorTex = 7;
    this.ceilTex = 7;
    this.blocksMotion = true;
    for (let i = 0; i < 6; i++) {
      const x = (Math.random() - 0.5);
      const y = (Math.random() - 0.7) * 0.3;
      const z = (Math.random() - 0.5);
      this.addSprite(new Sprite(x, y, z, (4 * 8) + 6 + Block.random.nextInt(2), Art.getCol(0x202020)));
    }
  }

  public blocks(entity: Entity): boolean {
    if (entity instanceof Bullet) return false;
    return super.blocks(entity);
  }
}
