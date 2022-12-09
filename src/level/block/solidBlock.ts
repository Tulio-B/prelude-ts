import { Block } from "../../module";

export class SolidBlock extends Block {
  constructor() {
    super();
    this.solidRender = true;
    this.blocksMotion = true;
  }
}
