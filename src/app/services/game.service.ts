import { Injectable, Inject } from '@angular/core';

@Injectable()
export class GameService {

  starshipImage: HTMLImageElement = null;
  context: CanvasRenderingContext2D;

  loadAssets(canvasElement: HTMLCanvasElement): Promise<void> {
    this.context = canvasElement.getContext('2d');
    return new Promise((resolve, reject) => {
      this.starshipImage = new Image();
      this.starshipImage.src = '../../assets/svg/starship.svg';
      this.starshipImage.width = 512;
      this.starshipImage.height = 512;
      this.starshipImage.onload = () => { resolve(); };
    });
  }

  startGameLoop() {
    const spriteX = 0;
    const spriteY = 0;
    const spriteWidth = 512;
    const spriteHeight = 512;
    const x = 0;
    const y = 0;
    this.context.drawImage(this.starshipImage, spriteX, spriteY, spriteWidth, spriteHeight, x, y, 100, 100);
  }
}
