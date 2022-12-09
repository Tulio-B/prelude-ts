import { Item, Level, SolidBlock, Sound } from "../../module";

export class SwitchBlock extends SolidBlock {
  private pressed = false;

  constructor() {
    super();
    this.tex = 2;
  }

  public use(level: Level, _item: Item): boolean {
    this.pressed = !this.pressed;
    if (this.pressed) this.tex = 3;
    else this.tex = 2;

    level.trigger(this.id, this.pressed);
    if (this.pressed) Sound.click1().play();
    else Sound.click2().play();

    return true;
  }
}
