import { Art, Block, Level, Random, Sprite } from "../../module";

export class TorchBlock extends Block {
  private torchSprite: Sprite;

  constructor() {
    super();
    this.torchSprite = new Sprite(0, 0, 0, 3, Art.getCol(0xffff00));
    this.sprites.push(this.torchSprite);
  }

  public decorate(level: Level, x: number, y: number): void {
    const random = new Random((x + (y * 1000)) * 341871231);
    const r = 0.4;
    for (let i = 0; i < 1000; i++) {
      const face = random.nextInt(4);
      if (face === 0 && level.getBlock(x - 1, y).solidRender) {
        this.torchSprite.x -= r;
        break;
      }
      if (face === 1 && level.getBlock(x, y - 1).solidRender) {
        this.torchSprite.z -= r;
        break;
      }
      if (face === 2 && level.getBlock(x + 1, y).solidRender) {
        this.torchSprite.x += r;
        break;
      }
      if (face === 3 && level.getBlock(x, y + 1).solidRender) {
        this.torchSprite.z += r;
        break;
      }
    }
  }

  public tick(): void {
    super.tick();
    if (Block.random.nextInt(4) === 0) this.torchSprite.tex = 3 + Block.random.nextInt(2);
  }
}