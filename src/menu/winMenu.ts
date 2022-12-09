import { Art, Bitmap, Game, Menu, Player, Sound, TitleMenu } from "../module";

export class WinMenu extends Menu {
  private tickDelay = 30;

  private player: Player;

  constructor(player: Player) {
    super();
    this.player = player;
  }

  public render(target: Bitmap): void {
    target.draw(Art.logo, 0, 10, 0, 65, 160, 23, Art.getCol(0xffffff));

    let seconds = Math.trunc(this.player.time / 60);
    const minutes = Math.trunc(seconds / 60);
    seconds %= 60;

    let timeString = `${minutes}:`;
    if (seconds < 10) timeString += "0";
    timeString += seconds;
    target.drawString(`Trinkets: ${this.player.loot}/12`, 40, 45 + (10 * 0), Art.getCol(0x909090));
    target.drawString(`Time: ${timeString}`, 40, 45 + (10 * 1), Art.getCol(0x909090));

    if (this.tickDelay === 0) target.drawString("-> Continue", 40, target.height - 40, Art.getCol(0xffff80));
  }

  public tick(game: Game, up: boolean, down: boolean, left: boolean, right: boolean, use: boolean): void {
    if (this.tickDelay > 0) this.tickDelay--;
    else if (use) {
      Sound.click1().play();
      game.setMenu(new TitleMenu());
    }
  }
}