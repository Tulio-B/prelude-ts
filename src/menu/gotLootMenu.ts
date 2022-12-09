import { Art, Bitmap, Game, Item, Menu } from "../module";

export class GotLootMenu extends Menu {
  private tickDelay = 30;
  private item: Item;

  constructor(item: Item) {
    super();
    this.item = item;
  }

  public render(target: Bitmap): void {
    let str = `You found the ${this.item.name}!`;
    target.scaleDraw(Art.items, 3, (target.width / 2) - (8 * 3), 2, this.item.icon * 16, 0, 16, 16, Art.getCol(this.item.color));
    target.drawString(str, ((target.width - (str.length * 6)) / 2) + 2, 60 - 10, Art.getCol(0xffff80));

    str = this.item.description;
    target.drawString(str, ((target.width - (str.length * 6)) / 2) + 2, 60, Art.getCol(0xa0a0a0));

    if (this.tickDelay === 0) target.drawString("-> Continue", 40, target.height - 40, Art.getCol(0xffff80));
  }

  public tick(game: Game, up: boolean, down: boolean, left: boolean, right: boolean, use: boolean): void {
    if (this.tickDelay > 0) this.tickDelay--;
    else if (use) {
      game.setMenu(null);
    }
  }
}