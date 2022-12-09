import { Art, Block, Bullet, Entity, EyeBossEntity, EyeEntity, Item, Player } from "../../module";

export class IceBlock extends Block {
  constructor() {
    super();
    this.blocksMotion = false;
    this.floorTex = 16;
  }

  public tick(): void {
    super.tick();
    this.floorCol = Art.getCol(0x8080ff);
  }

  public getWalkSpeed(player: Player): number {
    if (player.getSelectedItem() === Item.skates) return 0.05;
    return 1.4;
  }

  public getFriction(player: Player): number {
    if (player.getSelectedItem() === Item.skates) return 0.98;
    return 1;
  }

  public blocks(entity: Entity): boolean {
    if (entity instanceof Player) return false;
    if (entity instanceof Bullet) return false;
    if (entity instanceof EyeBossEntity) return false;
    if (entity instanceof EyeEntity) return false;
    return true;
  }
}
