import { GameDirection } from '../enumerations';
import { GameObject } from './game-object';
import { GameDirectionUtilities } from '../utilities';
export abstract class Sprite extends GameObject {

  abstract get Speed(): number;

  constructor( x: number, y: number) {
    super(x, y);
  }

  abstract draw( context: CanvasRenderingContext2D): void;

  move( direction: GameDirection, containerObject: GameObject ) {
    this.tryMove(direction);
    if (!this.checkBounds(containerObject)) {
      this.tryMove(GameDirectionUtilities.toOpposite(direction));
    }
  }

  tryMove( direction: GameDirection ) {
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

  private checkBounds( containerObject: GameObject ): boolean {
    return  this.Left >= containerObject.Left &&
            this.Right <= containerObject.Right &&
            this.Top >= containerObject.Top &&
            this.Bottom <= containerObject.Bottom;
  }
}
