export abstract class GameObject {
  get X(): number {
    return this.x;
  }
  get Y(): number {
    return this.y;
  }
  get Left(): number {
    return this.X;
  }
  get Right(): number {
    return this.X + this.Width;
  }
  get Top(): number {
    return this.Y;
  }
  get Bottom(): number {
    return this.Y + this.Height;
  }

  abstract get Width(): number;
  abstract get Height(): number;

  constructor( protected x: number, protected y: number) {}
}
