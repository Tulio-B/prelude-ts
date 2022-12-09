import { Block, Bullet, Entity, IceBlock, Item, Sound, WaterBlock } from "../module";

export class Player extends Entity {
  public bob = 0;
  public bobPhase = 0;
  public turnBob = 0;
  public selectedSlot = 0;
  public itemUseTime = 0;
  public y = 0;
  public ya = 0;
  public hurtTime = 0;
  public health = 20;
  public keys = 0;
  public loot = 0;
  public dead = false;
  public deadTime = 0;
  public ammo = 0;
  public potions = 0;
  private lastBlock: Block;

  public items: Item[] = new Array(8);

  constructor() {
    super();
    this.r = 0.3;
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = Item.none;
    }
  }

  public sliding = false;
  public time = 0;

  public tick(up?: boolean, down?: boolean, left?: boolean, right?: boolean, turnLeft?: boolean, turnRight?: boolean): void {
    if (this.dead) {
      up = false;
      down = false;
      left = false;
      right = false;
      turnLeft = false;
      turnRight = false;

      this.deadTime++;
      if (this.deadTime > 60 * 2) {
        this.level.lose();
      }
    } else {
      this.time++;
    }
    if (this.itemUseTime > 0) this.itemUseTime--;
    if (this.hurtTime > 0) this.hurtTime--;

    const onBlock = this.level.getBlock(Math.trunc(this.x + 0.5), Math.trunc(this.z + 0.5));

    let fh = onBlock.getFloorHeight(this);
    if (onBlock instanceof WaterBlock && !(this.lastBlock instanceof WaterBlock)) {
      Sound.splash().play();
    }

    this.lastBlock = onBlock;

    if (this.dead) fh = -0.6;
    if (fh > this.y) {
      this.y += (fh - this.y) * 0.2;
      this.ya = 0;
    } else {
      this.ya -= 0.01;
      this.y += this.ya;
      if (this.y < fh) {
        this.y = fh;
        this.ya = 0;
      }
    }

    const rotSpeed = 0.05;
    const walkSpeed = 0.03 * onBlock.getWalkSpeed(this);

    if (turnLeft) this.rota += rotSpeed;
    if (turnRight) this.rota -= rotSpeed;

    let xm = 0;
    let zm = 0;
    if (up) zm--;
    if (down) zm++;
    if (left) xm--;
    if (right) xm++;
    let dd = (xm * xm) + (zm * zm);
    if (dd > 0) dd = Math.sqrt(dd);
    else dd = 1;
    xm /= dd;
    zm /= dd;

    this.bob *= 0.6;
    this.turnBob *= 0.8;
    this.turnBob += this.rota;
    this.bob += Math.sqrt((xm * xm) + (zm * zm));
    this.bobPhase += Math.sqrt((xm * xm) + (zm * zm)) * onBlock.getWalkSpeed(this);
    const wasSliding = this.sliding;
    this.sliding = false;

    if (onBlock instanceof IceBlock && this.getSelectedItem() !== Item.skates) {
      if (this.xa * this.xa > this.za * this.za) {
        this.sliding = true;
        this.za = 0;
        if (this.xa > 0) this.xa = 0.08;
        else this.xa = -0.08;
        this.z += ((Math.trunc(this.z + 0.5)) - this.z) * 0.2;
      } else if (this.xa * this.xa < this.za * this.za) {
        this.sliding = true;
        this.xa = 0;
        if (this.za > 0) this.za = 0.08;
        else this.za = -0.08;
        this.x += ((Math.trunc(this.x + 0.5)) - this.x) * 0.2;
      } else {
        this.xa -= ((xm * Math.cos(this.rot)) + (zm * Math.sin(this.rot))) * 0.1;
        this.za -= ((zm * Math.cos(this.rot)) - (xm * Math.sin(this.rot))) * 0.1;
      }

      if (!wasSliding && this.sliding) {
        Sound.slide().play();
      }
    } else {
      this.xa -= ((xm * Math.cos(this.rot)) + (zm * Math.sin(this.rot))) * walkSpeed;
      this.za -= ((zm * Math.cos(this.rot)) - (xm * Math.sin(this.rot))) * walkSpeed;
    }

    this.move();

    const friction = onBlock.getFriction(this);
    this.xa *= friction;
    this.za *= friction;
    this.rot += this.rota;
    this.rota *= 0.4;
  }

  public activate(): void {
    if (this.dead) return;
    if (this.itemUseTime > 0) return;
    const item = this.items[this.selectedSlot];
    if (item === Item.pistol) {
      if (this.ammo > 0) {
        Sound.shoot().play();
        this.itemUseTime = 10;
        this.level.addEntity(new Bullet(this, this.x, this.z, this.rot, 1, 0, 0xffffff));
        this.ammo--;
      }
      return;
    }
    if (item === Item.potion) {
      if (this.potions > 0 && this.health < 20) {
        Sound.potion().play();
        this.itemUseTime = 20;
        this.health += 5 + Entity.random.nextInt(6);
        if (this.health > 20) this.health = 20;
        this.potions--;
      }
      return;
    }
    if (item === Item.key) this.itemUseTime = 10;
    if (item === Item.powerGlove) this.itemUseTime = 10;
    if (item === Item.cutters) this.itemUseTime = 10;

    const xa = (2 * Math.sin(this.rot));
    const za = (2 * Math.cos(this.rot));

    const rr = 3;
    const xc = Math.trunc(this.x + 0.5);
    const zc = Math.trunc(this.z + 0.5);
    const possibleHits = [];
    for (let z = zc - rr; z <= zc + rr; z++) {
      for (let x = xc - rr; x <= xc + rr; x++) {
        const es = this.level.getBlock(x, z).entities;
        for (let i = 0; i < es.length; i++) {
          const e = es[i];
          if (e === this) continue;
          possibleHits.push(e);
        }
      }
    }

    const divs = 100;
    for (let i = 0; i < divs; i++) {
      const xx = this.x + ((xa * i) / divs);
      const zz = this.z + ((za * i) / divs);
      for (let j = 0; j < possibleHits.length; j++) {
        const e = possibleHits[j];
        if (e.contains(xx, zz)) {
          if (e.use(this, this.items[this.selectedSlot])) {
            return;
          }
        }
      }
      const xt = Math.trunc(xx + 0.5);
      const zt = Math.trunc(zz + 0.5);
      if (xt !== Math.trunc(this.x + 0.5) || zt !== Math.trunc(this.z + 0.5)) {
        const block = this.level.getBlock(xt, zt);
        if (block.use(this.level, this.items[this.selectedSlot])) {
          return;
        }
        if (block.blocks(this)) return;
      }
    }
  }

  public blocks(entity: Entity, x2: number, z2: number, r2: number): boolean {
    return super.blocks(entity, x2, z2, r2);
  }

  public getSelectedItem(): Item {
    return this.items[this.selectedSlot];
  }

  public addLoot(item: Item): void {
    if (item === Item.pistol) this.ammo += 20;
    if (item === Item.potion) this.potions += 1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        if (this.level !== null) this.level.showLootScreen(item);
        return;
      }
    }

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === Item.none) {
        this.items[i] = item;
        this.selectedSlot = i;
        this.itemUseTime = 0;
        if (this.level !== null) this.level.showLootScreen(item);
        return;
      }
    }
  }

  public hurt(enemy: Entity, dmg: number): void {
    if (this.hurtTime > 0 || this.dead) return;

    this.hurtTime = 40;
    this.health -= dmg;

    if (this.health <= 0) {
      this.health = 0;
      Sound.death().play();
      this.dead = true;
    }

    Sound.hurt().play();

    const xd = enemy.x - this.x;
    const zd = enemy.z - this.z;
    const dd = Math.sqrt((xd * xd) + (zd * zd));
    this.xa -= xd / dd * 0.1;
    this.za -= zd / dd * 0.1;
    this.rota += (Math.random() - 0.5) * 0.2;
  }

  protected collide(entity: Entity): void {
    if (entity instanceof Bullet) {
      const bullet = <Bullet>entity;
      if (bullet.owner.constructor === this.constructor) {
        return;
      }
      if (this.hurtTime > 0) return;
      entity.remove();
      this.hurt(entity, 1);
    }
  }

  public win(): void {
    this.level.win();
  }
}