import { Art, Bitmap, Game, Menu, Sound, TitleMenu } from "../module";

export class InstructionsMenu extends Menu {
  private tickDelay = 30;

  public render(target: Bitmap): void {
    target.fill(0, 0, 160, 120, 0);

    target.drawString("Instructions", 40, 8, Art.getCol(0xffffff));

    const lines = [
      "Use W,A,S,D to move, and",
      "the arrow keys to turn.",
      "",
      "The 1-8 keys select",
      "items from the inventory",
      "",
      "Space uses items",
    ];

    for (let i = 0; i < lines.length; i++) {
      target.drawString(lines[i], 4, 32 + (i * 8), Art.getCol(0xa0a0a0));
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