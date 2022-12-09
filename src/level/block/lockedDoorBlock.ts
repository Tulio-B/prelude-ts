import { DoorBlock, Item, Level } from "../../module";

export class LockedDoorBlock extends DoorBlock {
  constructor() {
    super();
    this.tex = 5;
  }

  public use(_level: Level, _item: Item): boolean {
    return false;
  }

  public trigger(pressed: boolean): void {
    this.open = pressed;
  }
}
