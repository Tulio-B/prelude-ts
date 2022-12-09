export class InputHandler {
  public keys: boolean[] = new Array(65536);

  constructor() {
    document.addEventListener("keydown", event => {
      const code = event.keyCode;
      if (code > 0 && code < this.keys.length) {
        this.keys[code] = true;
      }
    }, false);
    document.addEventListener("keyup", event => {
      const code = event.keyCode;
      if (code > 0 && code < this.keys.length) {
        this.keys[code] = false;
      }
    }, false);
  }
}