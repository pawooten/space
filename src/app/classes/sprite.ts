import { GameDirection } from '../enumerations';
import { GameObject } from './game-object';
import { GameDirectionUtilities } from '../utilities';
export abstract class Sprite extends GameObject {

  abstract get Speed(): number;

  constructor( x: number, y: number) {
    super(x, y);
  }

  abstract Draw( context: CanvasRenderingContext2D): void;

  move( direction: GameDirection, containerObject: GameObject ): boolean {
    this.tryMove(direction);
    if (!this.checkBounds(containerObject)) {
      this.tryMove(GameDirectionUtilities.toOpposite(direction));
      // The move was not successful, and must be undone
      return false;
    }
    // The move was successful
    return true;
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
