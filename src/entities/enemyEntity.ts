import { Art, Bullet, Entity, Item, Player, PoofSprite, Sound, Sprite } from "../module";

export class EnemyEntity extends Entity {
  protected sprite: Sprite;
  protected defaultTex: number;
  protected defaultColor: number;
  protected hurtTime = 0;
  protected animTime = 0;
  protected health = 3;
  protected spinSpeed = 0.1;
  protected runSpeed = 1;

  constructor(x: number, z: number, defaultTex: number, defaultColor: number) {
    super();
    this.x = x;
    this.z = z;
    this.defaultColor = defaultColor;
    this.defaultTex = defaultTex;
    this.sprite = new Sprite(0, 0, 0, 4 * 8, defaultColor);
    this.sprites.push(this.sprite);
    this.r = 0.3;
  }

  public tick(): void {
    if (this.hurtTime > 0) {
      this.hurtTime--;
      if (this.hurtTime === 0) {
        this.sprite.col = this.defaultColor;
      }
    }
    this.animTime++;
    this.sprite.tex = this.defaultTex + (Math.trunc(this.animTime / 10) % 2);
    this.move();
    if (this.xa === 0 || this.za === 0) {
      this.rota += (EnemyEntity.random.nextGaussian() * Math.random()) * 0.3;
    }

    this.rota += (EnemyEntity.random.nextGaussian() * Math.random()) * this.spinSpeed;
    this.rot += this.rota;
    this.rota *= 0.8;
    this.xa *= 0.8;
    this.za *= 0.8;
    this.xa += Math.sin(this.rot) * 0.004 * this.runSpeed;
    this.za += Math.cos(this.rot) * 0.004 * this.runSpeed;
  }

  public use(source: Entity, item: Item): boolean {
    if (this.hurtTime > 0) return false;
    if (item !== Item.powerGlove) return false;

    this.hurt(Math.sin(source.rot), Math.cos(source.rot));

    return true;
  }

  protected hurt(xd: number, zd: number): void {
    this.sprite.col = Art.getCol(0xff0000);
    this.hurtTime = 15;

    const dd = Math.sqrt((xd * xd) + (zd * zd));
    this.xa += xd / dd * 0.2;
    this.za += zd / dd * 0.2;
    Sound.hurt2().play();
    this.health--;
    if (this.health <= 0) {
      const xt = Math.trunc(this.x + 0.5);
      const zt = Math.trunc(this.z + 0.5);
      this.level.getBlock(xt, zt).addSprite(new PoofSprite(this.x - xt, 0, this.z - zt));
      this.die();
      this.remove();
      Sound.kill().play();
    }
  }

  protected die(): void {
  }

  protected collide(entity: Entity): void {
    if (entity instanceof Bullet) {
      const bullet = <Bullet> entity;
      if (bullet.owner.constructor === this.constructor) {
        return;
      }
      if (this.hurtTime > 0) return;
      entity.remove();
      this.hurt(entity.xa, entity.za);
    }
    if (entity instanceof Player) {
      (<Player> entity).hurt(this, 1);
    }
  }
}
