import { Art, Bitmap, Bitmap3D, Game, Item, Random } from "../module";

export class Screen extends Bitmap {
  private static readonly PANEL_HEIGHT = 29;

  private testBitmap: Bitmap;
  private viewport: Bitmap3D;

  constructor(width: number, height: number) {
    super(width, height);

    this.viewport = new Bitmap3D(width, height - Screen.PANEL_HEIGHT);
    this.testBitmap = new Bitmap(64, 64);

    const random = new Random();
    for (let i = 0; i < 64 * 64; i++) this.testBitmap.pixels[i] = random.nextInt() * (random.nextInt(5) / 4);
  }

  time = 0;

  public render(game: Game, hasFocus: boolean) {
    if (game.level) {
      const itemUsed = game.player.itemUseTime > 0;
      const item = game.player.items[game.player.selectedSlot];

      if (game.pauseTime > 0) {
        this.fill(0, 0, this.width, this.height, 0);
        const messages = [`Entering ${game.level.name}`];
        for (let y = 0; y < messages.length; y++) {
          this.drawString(messages[y], Math.trunc((this.width - (messages[y].length * 6)) / 2), Math.trunc((this.viewport.height - (messages.length * 8)) / 2) + (y * 8) + 1, 0x111111);
          this.drawString(messages[y], Math.trunc((this.width - (messages[y].length * 6)) / 2), Math.trunc((this.viewport.height - (messages.length * 8)) / 2) + (y * 8), 0x555544);
        }
      } else {
        this.viewport.render(game);
        this.viewport.postProcess();

        const block = game.level.getBlock(Math.trunc(game.player.x + 0.5), Math.trunc(game.player.z + 0.5));
        if (block.messages !== undefined && hasFocus) {
          for (let y = 0; y < block.messages.length; y++) {
            this.viewport.drawString(block.messages[y], Math.trunc((this.width - (block.messages[y].length * 6)) / 2), Math.trunc((this.viewport.height - (block.messages.length * 8)) / 2) + (y * 8) + 1, 0x111111);
            this.viewport.drawString(block.messages[y], Math.trunc((this.width - (block.messages[y].length * 6)) / 2), Math.trunc((this.viewport.height - (block.messages.length * 8)) / 2) + (y * 8), 0x555544);
          }
        }

        this.draw(this.viewport, 0, 0);
        let xx = Math.trunc(game.player.turnBob * 32);
        let yy = Math.trunc((Number(Math.sin(game.player.bobPhase * 0.4)) * game.player.bob) + (game.player.bob * 2));

        if (itemUsed) {
          xx = 0;
          yy = 0;
        }

        xx += this.width / 2;
        yy += this.height - Screen.PANEL_HEIGHT - (15 * 3);
        if (item !== Item.none) {
          this.scaleDraw(Art.items, 3, xx, yy, (16 * item.icon) + 1, 16 + 1 + (itemUsed ? 16 : 0), 15, 15, Art.getCol(item.color));
        }

        if (game.player.hurtTime > 0 || game.player.dead) {
          let offs = 1.5 - (game.player.hurtTime / 30.0);
          const random = new Random(111);
          if (game.player.dead) offs = 0.5;
          for (let i = 0; i < this.pixels.length; i++) {
            const xp = ((i % this.width) - (this.viewport.width / 2.0)) / this.width * 2;
            const yp = ((i / this.width) - (this.viewport.height / 2.0)) / this.viewport.height * 2;

            if (Math.random() + offs < Math.sqrt((xp * xp) + (yp * yp))) this.pixels[i] = Math.trunc(random.nextInt(5) / 4) * 0x550000;
          }
        }
      }

      this.draw(Art.panel, 0, this.height - Screen.PANEL_HEIGHT, 0, 0, this.width, Screen.PANEL_HEIGHT, Art.getCol(0x707070));

      this.drawString("å", 3, this.height - 26 + 0, 0x00ffff);
      this.drawString(`${game.player.keys}/4`, 10, this.height - 26 + 0, 0xffffff);
      this.drawString("Ä", 3, this.height - 26 + 8, 0xffff00);
      this.drawString(String(game.player.loot), 10, this.height - 26 + 8, 0xffffff);
      this.drawString("Å", 3, this.height - 26 + 16, 0xff0000);
      this.drawString(String(game.player.health), 10, this.height - 26 + 16, 0xffffff);

      for (let i = 0; i < 8; i++) {
        const slotItem = game.player.items[i];
        if (slotItem !== Item.none) {
          this.draw(Art.items, 30 + (i * 16), this.height - Screen.PANEL_HEIGHT + 2, slotItem.icon * 16, 0, 16, 16, Art.getCol(slotItem.color));
          if (slotItem === Item.pistol) {
            const str = String(game.player.ammo);
            this.drawString(str, 30 + (i * 16) + 17 - (str.length * 6), this.height - Screen.PANEL_HEIGHT + 1 + 10, 0x555555);
          }
          if (slotItem === Item.potion) {
            const str = String(game.player.potions);
            this.drawString(str, 30 + (i * 16) + 17 - (str.length * 6), this.height - Screen.PANEL_HEIGHT + 1 + 10, 0x555555);
          }
        }
      }

      this.draw(Art.items, 30 + (game.player.selectedSlot * 16), this.height - Screen.PANEL_HEIGHT + 2, 0, 48, 17, 17, Art.getCol(0xffffff));

      this.drawString(item.name, 26 + (((8 * 16) - (item.name.length * 4)) / 2), this.height - 9, 0xffffff);
    } else this.fill(0, 0, this.width, this.height, 0);

    if (game.menu !== null) {
      for (let i = 0; i < this.pixels.length; i++) {
        this.pixels[i] = (this.pixels[i] & 0xfcfcfc) >> 2;
      }
      game.menu.render(this);
    }

    if (!hasFocus) {
      for (let i = 0; i < this.pixels.length; i++) {
        this.pixels[i] = (this.pixels[i] & 0xFCFCFC) >> 2;
      }

      if (Math.trunc(Date.now() / 450 % 2) !== 0) {
        const msg = "Click to focus!";
        this.drawString(msg, (this.width - (msg.length * 6)) / 2, (this.height / 3) + 4, 0xFFFFFF);
      }
    }
  }
}