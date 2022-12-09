import { Item, Level, RubbleSprite, SolidBlock, Sound } from "../../module";

export class VanishBlock extends SolidBlock {
  private gone = false;

  constructor() {
    super();
    this.tex = 1;
  }

  public use(_level: Level, _item: Item): boolean {
    if (this.gone) return false;

    this.gone = true;
    this.blocksMotion = false;
    this.solidRender = false;
    Sound.crumble().play();

    for (let i = 0; i < 32; i++) {
      const sprite = new RubbleSprite();
      sprite.col = this.col;
      this.addSprite(sprite);
    }

    return true;
  }
}
