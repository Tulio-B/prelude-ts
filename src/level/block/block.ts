import { Entity, Item, Level, Player, Random, Sprite } from "../../module";

export class Block {
  protected static random = new Random();

  public blocksMotion = false;
  public solidRender = false;

  public messages: string[];

  //removed nasty circular dependency - solidWall isn't used.
  //public static solidWall: SolidBlock = new SolidBlock();

  public sprites: Sprite[] = [];
  public entities: Entity[] = [];

  public tex = -1;
  public col = -1;

  public floorCol = -1;
  public ceilCol = -1;

  public floorTex = -1;
  public ceilTex = -1;

  public level: Level;
  public x: number;
  public y: number;

  public id: number;

  public addSprite(sprite: Sprite): void {
    this.sprites.push(sprite);
  }

  public use(_level: Level, _item: Item): boolean {
    return false;
  }

  public tick(): void {
    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i];
      sprite.tick();
      if (sprite.removed) {
        this.sprites.splice(i--, 1);
      }
    }
  }

  public removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    if (index > -1) this.entities.splice(index, 1);
  }

  public addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  public blocks(_entity: Entity): boolean {
    return this.blocksMotion;
  }

  public decorate(_level: Level, _x: number, _y: number): void {
  }

  public getFloorHeight(_e: Entity): number {
    return 0;
  }

  public getWalkSpeed(_player: Player): number {
    return 1;
  }

  public getFriction(_player: Player): number {
    return 0.6;
  }

  public trigger(_pressed: boolean): void {
  }
}