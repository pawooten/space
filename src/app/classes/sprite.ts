export abstract class Sprite {
  get X(): number {
    return this.x;
  }
  get Y(): number {
    return this.y;
  }

  abstract get Width(): number;
  abstract get Height(): number;

  constructor( private x: number, private y: number) {}

  abstract draw( context: CanvasRenderingContext2D): void;
}
