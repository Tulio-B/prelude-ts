import { AboutMenu, Art, Bitmap, Game, InstructionsMenu, Menu, Sound } from "../module";

export class TitleMenu extends Menu {
  private options = ["New game", "Instructions", "About"];
  private selected = 0;
  private firstTick = true;

  public render(target: Bitmap): void {
    target.fill(0, 0, 160, 120, 0);
    target.draw(Art.logo, 0, 8, 0, 0, 160, 36, Art.getCol(0xffffff));

    for (let i = 0; i < this.options.length; i++) {
      let msg = this.options[i];
      let col = 0x909090;
      if (this.selected === i) {
        msg = `-> ${msg}`;
        col = 0xffff80;
      }
      target.drawString(msg, 40, 60 + (i * 10), Art.getCol(col));
    }

    target.drawString("Copyright (C) 2011 Mojang", 1 + 4, 120 - 9, Art.getCol(0x303030));
  }

  public tick(game: Game, up: boolean, down: boolean, left: boolean, right: boolean, use: boolean) {
    if (this.firstTick) {
      this.firstTick = false;
      Sound.altar().play();
    }

    if (up || down) Sound.click2().play();
    if (up) this.selected--;
    if (down) this.selected++;
    if (this.selected < 0) this.selected = 0;
    if (this.selected >= this.options.length) this.selected = this.options.length - 1;
    if (use) {
      Sound.click1().play();
      if (this.selected === 0) {
        game.setMenu(null);
        game.newGame();
      } else if (this.selected === 1) {
        game.setMenu(new InstructionsMenu());
      } else if (this.selected === 2) {
        game.setMenu(new AboutMenu());
      }
    }
  }
}