import { Art, Bitmap, Game, Menu, Sound, TitleMenu } from "../module";

export class PauseMenu extends Menu {
  private options = ["Abort game", "Continue"];
  private selected = 1;

  public render(target: Bitmap): void {
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
  }

  public tick(game: Game, up: boolean, down: boolean, left: boolean, right: boolean, use: boolean): void {
    if (up || down) Sound.click2().play();
    if (up) this.selected--;
    if (down) this.selected++;
    if (this.selected < 0) this.selected = 0;
    if (this.selected >= this.options.length) this.selected = this.options.length - 1;
    if (use) {
      Sound.click1().play();
      if (this.selected === 0) {
        game.setMenu(new TitleMenu());
      }
      if (this.selected === 1) {
        game.setMenu(null);
      }
    }
  }
}