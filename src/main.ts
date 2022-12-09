import { Game, InputHandler, Renderer, Screen } from "./module";

class App {
  private static readonly WIDTH = 160;
  private static readonly HEIGHT = 120;
  private static readonly SCALE = 4;

  private game: Game;
  private screen: Screen;
  private renderer = new Renderer(App.WIDTH, App.HEIGHT, App.SCALE);

  private inputHandler: InputHandler;
  private frames = 0;
  private tickCount = 0;

  private unprocessedMilisseconds = 0;
  private lastTime: number;
  private readonly milissecondsPerFrame = 1000 / 60;

  constructor() {
    this.game = new Game();
    this.inputHandler = new InputHandler();
    this.screen = new Screen(App.WIDTH, App.HEIGHT);

    this.loop();
  }

  private loop(now?: number): void {
    const delta = (now - this.lastTime) || 0;
    this.lastTime = now;

    requestAnimationFrame(this.loop.bind(this));

    this.unprocessedMilisseconds += delta;
    while (this.unprocessedMilisseconds > this.milissecondsPerFrame) {
      this.tick();
      this.tickCount++;

      if (this.tickCount % 60 === 0) {
        console.log(`${this.frames} fps`);
        this.frames = 0;
      }

      this.unprocessedMilisseconds -= this.milissecondsPerFrame;
    }

    this.render();
  }

  private tick() {
    this.game.tick(this.inputHandler.keys);
  }

  private render() {
    this.screen.render(this.game, true);
    this.renderer.drawScreen(this.screen);
    this.frames++;
  }
}

window.onload = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = new App();
};