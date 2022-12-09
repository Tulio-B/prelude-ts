import { Art, Block, Item, Level, Sound, Sprite } from "../../module";

export class ChestBlock extends Block {
  private open = false;
  private chestSprite: Sprite;

  constructor() {
    super();
    this.tex = 1;
    this.blocksMotion = true;

    this.chestSprite = new Sprite(0, 0, 0, (8 * 2) + 0, Art.getCol(0xffff00));
    this.addSprite(this.chestSprite);
  }

  public use(level: Level, _item: Item): boolean {
    if (this.open) return false;

    this.chestSprite.tex++;
    this.open = true;

    level.getLoot(this.id);
    Sound.treasure().play();

    return true;
  }
}