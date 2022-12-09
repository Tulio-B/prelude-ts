import { Art, Block, Bullet, Entity, Item, Player } from "../../module";

export class WaterBlock extends Block {
  steps = 0;

  constructor() {
    super();
    this.blocksMotion = true;
  }

  public tick(): void {
    super.tick();
    this.steps--;
    if (this.steps <= 0) {
      this.floorTex = 8 + Block.random.nextInt(3);
      this.floorCol = Art.getCol(0x0000ff);
      this.steps = 16;
    }
  }

  public blocks(entity: Entity): boolean {
    if (entity instanceof Player) {
      if ((<Player> entity).getSelectedItem() === Item.flippers) return false;
    }
    if (entity instanceof Bullet) return false;
    return this.blocksMotion;
  }

  public getFloorHeight(_e: Entity): number {
    return -0.5;
  }

  public getWalkSpeed(_player: Player): number {
    return 0.4;
  }
}
