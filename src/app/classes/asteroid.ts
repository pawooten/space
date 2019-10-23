import { PathSprite } from './path-sprite';
import { AsteroidSize, SpritePathType } from '../enumerations';

export class Asteroid extends PathSprite {

  private readonly sourceX = 0;
  private readonly sourceY = 0;

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

  constructor( path: SpritePathType, size: AsteroidSize, x: number, y: number, private image: HTMLImageElement ) {
    super(path, x, y);

    switch (size) {
      case AsteroidSize.Small:
        this._width = 32;
        this._height = 32;
        break;
      case AsteroidSize.Medium:
        this._width = 64;
        this._height = 64;
        break;
      case AsteroidSize.Large:
        this._width = 96;
        this._height = 96;
        break;
    }
  }

  draw( context: CanvasRenderingContext2D ): void {
    const spriteWidth = 640;
    const spriteHeight = 640;
    context.drawImage(this.image, this.sourceX, this.sourceY, spriteWidth, spriteHeight, this.X, this.Y, this.Width, this.Height);

  }
}
