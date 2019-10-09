import { Injectable, Inject } from '@angular/core';

import { Starship } from '../classes/starship';
import { playFieldConfig, starshipConfig } from '../config';

@Injectable()
export class GameService {

  private starship: Starship;

  context: CanvasRenderingContext2D;

  loadAssets(canvasElement: HTMLCanvasElement): Promise<void> {
    this.context = canvasElement.getContext('2d');
    return new Promise((resolve, reject) => {
      const starshipImage = new Image();
      starshipImage.src = starshipConfig.imageSource;
      starshipImage.width = starshipConfig.imageWidth;
      starshipImage.height = starshipConfig.imageHeight;
      starshipImage.onload = () => {
        // Center the starship in the middle of the play field
        const x = (playFieldConfig.width - starshipConfig.width) / 2;
        const y = playFieldConfig.height - starshipConfig.height;
        this.starship = new Starship( x, y, starshipImage);
        resolve(); };
    });
  }

  startGameLoop() {
    this.drawGrid();
    this.starship.draw(this.context);
  }

  private drawGrid() {
    this.context.strokeStyle = 'ghostwhite';
    for (let iy = 0; iy < playFieldConfig.fieldCellHeight; iy++) {
      for (let ix = 0; ix < playFieldConfig.fieldCellWidth; ix++) {
        this.context.strokeRect(ix * playFieldConfig.cellWidth, iy * playFieldConfig.cellWidth,
          playFieldConfig.cellWidth, playFieldConfig.cellWidth);
      }
    }
  }
}
