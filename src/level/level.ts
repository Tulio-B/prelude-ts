import { AltarBlock, Art, BarsBlock, BatBossEntity, BatEntity, Bitmap, Block, BossOgre, BoulderEntity, ChestBlock, CryptLevel, DoorBlock, DungeonLevel, Entity, EyeBossEntity, EyeEntity, FinalUnlockBlock,
  Game, GhostBossEntity, GhostEntity, GotLootMenu, IceBlock, IceLevel, Item, LadderBlock, LockedDoorBlock, LootBlock, OgreEntity, OverworldLevel, PitBlock, Player, PressurePlateBlock, SolidBlock,
  SpiritWallBlock, StartLevel, SwitchBlock, TempleLevel, TorchBlock, VanishBlock, WaterBlock, WinBlock } from "../module";

import cryptImage from "../../assets/level/crypt.png";
import dungeonImage from "../../assets/level/dungeon.png";
import iceImage from "../../assets/level/ice.png";
import overworldImage from "../../assets/level/overworld.png";
import startImage from "../../assets/level/start.png";
import templeImage from "../../assets/level/temple.png";

export abstract class Level {
  public blocks: Block[] = [];
  public width: number;
  public height: number;
  private solidWall = new SolidBlock();

  public xSpawn: number;
  public ySpawn: number;

  protected wallCol = 0xB3CEE2;
  protected floorCol = 0x9CA09B;
  protected ceilCol = 0x9CA09B;

  protected wallTex = 0;
  protected floorTex = 0;
  protected ceilTex = 0;

  public entities: Entity[] = [];
  protected game: Game;
  public name = "";

  public player: Player;

  public static crypt: Bitmap = new Bitmap(0, 0);
  public static dungeon: Bitmap = new Bitmap(0, 0);
  public static ice: Bitmap = new Bitmap(0, 0);
  public static overworld: Bitmap = new Bitmap(0, 0);
  public static start: Bitmap = new Bitmap(0, 0);
  public static temple: Bitmap = new Bitmap(0, 0);

  static {
    Level.loadBitmap(cryptImage).then(image => (Level.crypt = image));
    Level.loadBitmap(dungeonImage).then(image => (Level.dungeon = image));
    Level.loadBitmap(iceImage).then(image => (Level.ice = image));
    Level.loadBitmap(overworldImage).then(image => (Level.overworld = image));
    Level.loadBitmap(startImage).then(image => (Level.start = image));
    Level.loadBitmap(templeImage).then(image => (Level.temple = image));
  }

  public init(game: Game, name: string, w: number, h: number, pixels: number[]): void {
    this.game = game;

    this.player = game.player;

    this.solidWall.col = Art.getCol(this.wallCol);
    this.solidWall.tex = Art.getCol(this.wallTex);
    this.width = w;
    this.height = h;
    this.blocks = new Array(this.width * this.height);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const col = pixels[x + (y * w)] & 0xffffff;
        const id = 255 - ((pixels[x + (y * w)] >> 24) & 0xff);

        const block = this.getBlock(x, y, col);
        block.id = id;

        if (block.tex === -1) block.tex = this.wallTex;
        if (block.floorTex === -1) block.floorTex = this.floorTex;
        if (block.ceilTex === -1) block.ceilTex = this.ceilTex;
        if (block.col === -1) block.col = Art.getCol(this.wallCol);
        if (block.floorCol === -1) block.floorCol = Art.getCol(this.floorCol);
        if (block.ceilCol === -1) block.ceilCol = Art.getCol(this.ceilCol);

        this.blocks[x + (y * w)] = block;
        block.level = this;
        block.x = x;
        block.y = y;
      }
    }

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const col = pixels[x + (y * w)] & 0xffffff;
        this.decorateBlock(x, y, this.blocks[x + (y * w)], col);
      }
    }
  }

  public addEntity(e: Entity): void {
    this.entities.push(e);
    e.level = this;
    e.updatePos();
  }

  public removeEntityImmediately(player: Player): void {
    const index = this.entities.indexOf(player);
    if (index > -1) this.entities.splice(index, 1);

    this.getBlock(player.xTileO, player.zTileO).removeEntity(player);
  }

  protected decorateBlock(x: number, y: number, block: Block, col: number): void {
    block.decorate(this, x, y);
    if (col === 0xFFFF00) {
      this.xSpawn = x;
      this.ySpawn = y;
    }
    if (col === 0xAA5500) this.addEntity(new BoulderEntity(x, y));
    if (col === 0xff0000) this.addEntity(new BatEntity(x, y));
    if (col === 0xff0001) this.addEntity(new BatBossEntity(x, y));
    if (col === 0xff0002) this.addEntity(new OgreEntity(x, y));
    if (col === 0xff0003) this.addEntity(new BossOgre(x, y));
    if (col === 0xff0004) this.addEntity(new EyeEntity(x, y));
    if (col === 0xff0005) this.addEntity(new EyeBossEntity(x, y));
    if (col === 0xff0006) this.addEntity(new GhostEntity(x, y));
    if (col === 0xff0007) this.addEntity(new GhostBossEntity(x, y));
    if (col === 0x1A2108 || col === 0xff0007) {
      block.floorTex = 7;
      block.ceilTex = 7;
    }

    if (col === 0xC6C6C6) block.col = Art.getCol(0xa0a0a0);
    if (col === 0xC6C697) block.col = Art.getCol(0xa0a0a0);
    if (col === 0x653A00) {
      block.floorCol = Art.getCol(0xB56600);
      block.floorTex = (3 * 8) + 1;
    }

    if (col === 0x93FF9B) {
      block.col = Art.getCol(0x2AAF33);
      block.tex = 8;
    }
  }

  public getBlock(x: number, y: number, col?: number): Block {
    if (col === undefined) {
      if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
        return this.solidWall;
      }
      return this.blocks[x + (y * this.width)];
    }

    if (col === 0x93FF9B) return new SolidBlock();
    if (col === 0x009300) return new PitBlock();
    if (col === 0xFFFFFF) return new SolidBlock();
    if (col === 0x00FFFF) return new VanishBlock();
    if (col === 0xFFFF64) return new ChestBlock();
    if (col === 0x0000FF) return new WaterBlock();
    if (col === 0xFF3A02) return new TorchBlock();
    if (col === 0x4C4C4C) return new BarsBlock();
    if (col === 0xFF66FF) return new LadderBlock(false);
    if (col === 0x9E009E) return new LadderBlock(true);
    if (col === 0xC1C14D) return new LootBlock();
    if (col === 0xC6C6C6) return new DoorBlock();
    if (col === 0x00FFA7) return new SwitchBlock();
    if (col === 0x009380) return new PressurePlateBlock();
    if (col === 0xff0005) return new IceBlock();
    if (col === 0x3F3F60) return new IceBlock();
    if (col === 0xC6C697) return new LockedDoorBlock();
    if (col === 0xFFBA02) return new AltarBlock();
    if (col === 0x749327) return new SpiritWallBlock();
    if (col === 0x1A2108) return new Block();
    if (col === 0x00C2A7) return new FinalUnlockBlock();
    if (col === 0x000056) return new WinBlock();

    return new Block();
  }

  private static loaded = new Map<string, Level>();

  public static clear(): void {
    Level.loaded.clear();
  }

  public static async loadBitmap(image: string): Promise<Bitmap> {
    const imageElement = new Image();
    const imageCanvas = document.createElement("canvas");
    const imageCtx = imageCanvas.getContext("2d");

    imageElement.src = image;
    await imageElement.decode();

    imageCtx.drawImage(imageElement, 0, 0);
    const bitmap = new Bitmap(imageElement.naturalWidth, imageElement.naturalHeight);
    const data = imageCtx.getImageData(0, 0, imageElement.naturalWidth, imageElement.naturalHeight).data;

    for (let i = 0; i < data.length; i += 4) {
      bitmap.pixels[i / 4] = (data[i + 3] << 24) | (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
    }

    return bitmap;
  }

  public static loadLevel(game: Game, name: string): Level {
    if (this.loaded.has(name)) return this.loaded.get(name);

    let levelBitmap: Bitmap;
    if (name === "crypt") levelBitmap = Level.crypt;
    if (name === "dungeon") levelBitmap = Level.dungeon;
    if (name === "ice") levelBitmap = Level.ice;
    if (name === "overworld") levelBitmap = Level.overworld;
    if (name === "start") levelBitmap = Level.start;
    if (name === "temple") levelBitmap = Level.temple;

    const w = levelBitmap.width;
    const h = levelBitmap.height;

    const level = Level.byName(name);
    level.init(game, name, w, h, levelBitmap.pixels);
    this.loaded.set(name, level);

    return level;
  }

  private static byName(name: string): Level {
    if (name === "crypt") return new CryptLevel();
    if (name === "dungeon") return new DungeonLevel();
    if (name === "ice") return new IceLevel();
    if (name === "overworld") return new OverworldLevel();
    if (name === "start") return new StartLevel();
    if (name === "temple") return new TempleLevel();
  }

  public containsBlockingEntity(x0: number, y0: number, x1: number, y1: number): boolean {
    const xc = Math.trunc(Math.floor((x1 + x0) / 2));
    const zc = Math.trunc(Math.floor((y1 + y0) / 2));
    const rr = 2;
    for (let z = zc - rr; z <= zc + rr; z++) {
      for (let x = xc - rr; x <= xc + rr; x++) {
        const es = this.getBlock(x, z).entities;
        for (let i = 0; i < es.length; i++) {
          const e = es[i];
          if (e.isInside(x0, y0, x1, y1)) return true;
        }
      }
    }
    return false;
  }

  public containsBlockingNonFlyingEntity(x0: number, y0: number, x1: number, y1: number): boolean {
    const xc = Math.trunc(Math.floor((x1 + x0) / 2));
    const zc = Math.trunc(Math.floor((y1 + y0) / 2));
    const rr = 2;
    for (let z = zc - rr; z <= zc + rr; z++) {
      for (let x = xc - rr; x <= xc + rr; x++) {
        const es = this.getBlock(x, z).entities;
        for (let i = 0; i < es.length; i++) {
          const e = es[i];
          if (!e.flying && e.isInside(x0, y0, x1, y1)) return true;
        }
      }
    }
    return false;
  }

  public tick(): void {
    for (let i = 0; i < this.entities.length; i++) {
      const e = this.entities[i];
      e.tick();
      e.updatePos();
      if (e.isRemoved()) {
        this.entities.splice(i--, 1);
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.blocks[x + (y * this.width)].tick();
      }
    }
  }

  public trigger(id: number, pressed: boolean): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const b = this.blocks[x + (y * this.width)];
        if (b.id === id) {
          b.trigger(pressed);
        }
      }
    }
  }

  abstract switchLevel(id: number): void;

  public findSpawn(id: number): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const b = this.blocks[x + (y * this.width)];
        if (b.id === id && b instanceof LadderBlock) {
          this.xSpawn = x;
          this.ySpawn = y;
        }
      }
    }
  }

  public getLoot(id: number): void {
    if (id === 20) this.game.getLoot(Item.pistol);
    if (id === 21) this.game.getLoot(Item.potion);
  }

  public win(): void {
    this.game.win(this.player);
  }

  public lose(): void {
    this.game.lose(this.player);
  }

  public showLootScreen(item: Item): void {
    this.game.setMenu(new GotLootMenu(item));
  }
}