import { Sprite } from './sprite';

export class Asteroid extends Sprite {

  private readonly sourceX = 0;
  private readonly sourceY = 0;

  get Width(): number {
    return 64;
  }

  get Height(): number {
    return 64;
  }

  get Speed(): number {
    return 3;
  }

  constructor( x: number, y: number, private image: HTMLImageElement ) {
    super(x, y);
  }

  draw( context: CanvasRenderingContext2D ): void {
    const spriteWidth = 640;
    const spriteHeight = 640;
    context.drawImage(this.image, this.sourceX, this.sourceY, spriteWidth, spriteHeight, this.X, this.Y, this.Width, this.Height);

  }
}
