import { Item, Level, LoseMenu, PauseMenu, Player, TitleMenu, WinMenu } from "./module";
import type { LadderBlock, Menu } from "./module";

export class Game {
  public time: number;
  public pauseTime: number;
  public level: Level;
  public player: Player;
  public menu: Menu;

  constructor() {
    this.setMenu(new TitleMenu());
  }

  public newGame(): void {
    Level.clear();
    this.level = Level.loadLevel(this, "start");

    this.player = new Player();
    this.player.level = this.level;
    this.level.player = this.player;
    this.player.x = this.level.xSpawn;
    this.player.z = this.level.ySpawn;
    this.level.addEntity(this.player);
    this.player.rot = Math.PI + 0.4;
  }

  public switchLevel(name: string, id: number): void {
    this.pauseTime = 30;
    this.level.removeEntityImmediately(this.player);
    this.level = Level.loadLevel(this, name);
    this.level.findSpawn(id);
    this.player.x = this.level.xSpawn;
    this.player.z = this.level.ySpawn;
    (<LadderBlock> this.level.getBlock(this.level.xSpawn, this.level.ySpawn)).wait = true;
    this.player.x += Math.sin(this.player.rot) * 0.2;
    this.player.z += Math.sin(this.player.rot) * 0.2;
    this.level.addEntity(this.player);
  }

  public tick(keys: boolean[]): void {
    if (this.pauseTime > 0) {
      this.pauseTime--;
      return;
    }

    this.time++;

    const strafe = keys[17] || keys[18] || keys[16];

    const lk = keys[37] || keys[100];
    const rk = keys[39] || keys[102];

    const up = keys[87] || keys[38] || keys[104];
    const down = keys[83] || keys[40] || keys[98];
    const left = keys[65] || (strafe && lk);
    const right = keys[68] || (strafe && rk);

    const turnLeft = keys[81] || (!strafe && lk);
    const turnRight = keys[69] || (!strafe && rk);

    const use = keys[32];

    for (let i = 0; i < 8; i++) {
      if (keys[49 + i]) {
        keys[49 + i] = false;
        this.player.selectedSlot = i;
        this.player.itemUseTime = 0;
      }
    }

    if (keys[27]) {
      keys[27] = false;
      if (this.menu === null) this.setMenu(new PauseMenu());
    }

    if (use) {
      keys[32] = false;
    }

    if (this.menu === null) {
      this.player.tick(up, down, left, right, turnLeft, turnRight);
      if (use) {
        this.player.activate();
      }

      this.level.tick();
    } else {
      keys[87] = false;
      keys[38] = false;
      keys[104] = false;
      keys[83] = false;
      keys[40] = false;
      keys[98] = false;
      keys[65] = false;
      keys[68] = false;

      this.menu.tick(this, up, down, left, right, use);
    }
  }

  public getLoot(item: Item): void {
    this.player.addLoot(item);
  }

  public win(player: Player): void {
    this.setMenu(new WinMenu(player));
  }

  public lose(player: Player): void {
    this.setMenu(new LoseMenu(player));
  }

  public setMenu(menu: Menu) {
    this.menu = menu;
  }
}