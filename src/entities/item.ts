export class Item {
  static none = new Item(-1, 0xFFc363, "", "");
  static powerGlove = new Item(0, 0xFFc363, "Power Glove", "Smaaaash!!");
  static pistol = new Item(1, 0xEAEAEA, "Pistol", "Pew, pew, pew!");
  static flippers = new Item(2, 0x7CBBFF, "Flippers", "Splish splash!");
  static cutters = new Item(3, 0xCCCCCC, "Cutters", "Snip, snip!");
  static skates = new Item(4, 0xAE70FF, "Skates", "Sharp!");
  static key = new Item(5, 0xFF4040, "Key", "How did you get this?");
  static potion = new Item(6, 0x4AFF47, "Potion", "Healthy!");

  public readonly icon: number;
  public readonly color: number;
  public readonly name: string;
  public readonly description: string;

  private constructor(icon: number, color: number, name: string, description: string) {
    this.icon = icon;
    this.color = color;
    this.name = name;
    this.description = description;
  }
}