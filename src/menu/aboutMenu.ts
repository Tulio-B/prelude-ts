import { Art, Bitmap, Game, Menu, Sound, TitleMenu } from "../module";

export class AboutMenu extends Menu {
  private tickDelay = 30;

  public render(target: Bitmap): void {
    target.fill(0, 0, 160, 120, 0);

    target.drawString("About", 60, 8, Art.getCol(0xffffff));

    const lines = [
      "Prelude of the Chambered",
      "by Markus Persson.",
      "Made Aug 2011 for the",
      "21'st Ludum Dare compo.",
      "",
      "This game is freeware,",
      "and was made from scratch",
      "in just 48 hours.",
    ];

    for (let i = 0; i < lines.length; i++) {
      target.drawString(lines[i], 4, 28 + (i * 8), Art.getCol(0xa0a0a0));
    }

    if (this.tickDelay === 0) target.drawString("-> Continue", 40, target.height - 16, Art.getCol(0xffff80));
  }

  public tick(game: Game, up: boolean, down: boolean, left: boolean, right: boolean, use: boolean) {
    if (this.tickDelay > 0) this.tickDelay--;
    else if (use) {
      Sound.click1().play();
      game.setMenu(new TitleMenu());
    }
  }
}