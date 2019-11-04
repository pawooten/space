import { Sprite } from './sprite';
import { GameDirection } from '../enumerations';

export class Starship extends Sprite {

  private readonly sourceX = 0;
  private readonly sourceY = 0;

  get Width(): number {
    return 64;
  }

  get Height(): number {
    return 64;
  }

  get Speed(): number {
    return 8;
  }

  constructor( x: number, y: number, private image: HTMLImageElement ) {
    super(x, y);
  }

  Draw( context: CanvasRenderingContext2D) {
    const spriteWidth = 512;
    const spriteHeight = 512;
    context.drawImage(this.image, this.sourceX, this.sourceY, spriteWidth, spriteHeight, this.X, this.Y, this.Width, this.Height);
  }
}
