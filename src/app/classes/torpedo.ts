import { PathSprite } from './path-sprite';
import { ObjectPathType } from '../enumerations';

export class Torpedo extends PathSprite {
  private readonly sourceX = 100;
  private readonly sourceY = 30;

  private _width: number;
  get Width(): number {
    return this._width;
  }

  private _height: number;
  get Height(): number {
    return this._height;
  }

  get Speed(): number {
    return 3;
  }

  constructor( x: number, y: number, private image: HTMLImageElement ) {
    super( ObjectPathType.StraightDown, x, y);
    this._width = 8;
    this._height = 32;
  }

  Draw( context: CanvasRenderingContext2D ): void {
    const spriteWidth = 56;
    const spriteHeight = 200;
    context.drawImage(this.image, this.sourceX, this.sourceY, spriteWidth, spriteHeight, this.X, this.Y, this.Width, this.Height);
    // context.strokeRect(this.X, this.y, this.Width, this.Height);
  }
}
