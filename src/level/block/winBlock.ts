import { Block, Entity, Player } from "../../module";

export class WinBlock extends Block {
  public addEntity(entity: Entity): void {
    super.addEntity(entity);
    if (entity instanceof Player) {
      (<Player> entity).win();
    }
  }
}
