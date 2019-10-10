import { GameDirection } from '../enumerations';

export abstract class Sprite {
  get X(): number {
    return this.x;
  }
  get Y(): number {
    return this.y;
  }

  abstract get Width(): number;
  abstract get Height(): number;
  abstract get Speed(): number;

  constructor( protected x: number, protected y: number) {}

  abstract draw( context: CanvasRenderingContext2D): void;

  move( direction: GameDirection) {
    switch (direction) {
      case GameDirection.Left:
        this.x -= this.Speed;
        break;
      case GameDirection.Up:
        this.y -= this.Speed;
        break;
      case GameDirection.Right:
        this.x += this.Speed;
        break;
      case GameDirection.Down:
        this.y += this.Speed;
        break;
    }
  }
}
