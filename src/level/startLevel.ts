import { Block, Level } from "../module";

export class StartLevel extends Level {
  constructor() {
    super();
    this.name = "The Prison";
  }

  protected decorateBlock(x: number, y: number, block: Block, col: number): void {
    super.decorateBlock(x, y, block, col);
  }

  public getBlock(x: number, y: number, col: number): Block {
    return super.getBlock(x, y, col);
  }

  public switchLevel(id: number): void {
    if (id === 1) this.game.switchLevel("overworld", 1);
    if (id === 2) this.game.switchLevel("dungeon", 1);
  }

  public getLoot(id: number): void {
    super.getLoot(id);
  }
}