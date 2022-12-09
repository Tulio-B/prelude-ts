export class Random {
  private seed = 1;
  private maxInt = 2 ** 32;

  constructor(seed?: number) {
    //This is needed because Notch decided to make torches attach to random walls if there are more than just one,
    // so the seed needs to be forced in a way that it behaves just like the Java version
    if (seed !== undefined) this.seed = seed * 3;
  }

  private random(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  public nextInt(upper?: number): number {
    return Math.trunc(this.random() * (upper || this.maxInt));
  }

  public nextGaussian(): number {
    return this.random();
  }
}