import { Item, Level, SolidBlock, Sound } from "../../module";

export class FinalUnlockBlock extends SolidBlock {
  private pressed = false;

  constructor() {
    super();
    this.tex = 8 + 3;
  }

  public use(_level: Level, _item: Item): boolean {
    if (this.pressed) return false;
    if (this.level.player.keys < 4) return false;

    Sound.click1().play();
    this.pressed = true;
    this.level.trigger(this.id, true);

    return true;
  }
}
