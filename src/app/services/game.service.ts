import { Injectable, Inject } from '@angular/core';

import { Key } from 'ts-keycode-enum';

import { Starship } from '../classes/starship';
import { playFieldConfig, starshipConfig } from '../config';
import { KeyboardEventType, GameDirection } from '../enumerations';


@Injectable()
export class GameService {

  private starship: Starship;

  public showGrid = false;

  context: CanvasRenderingContext2D;

  loadAssets(canvasElement: HTMLCanvasElement): Promise<void> {
    this.context = canvasElement.getContext('2d');
    return new Promise((resolve, reject) => {
      const starshipImage = new Image();
      starshipImage.src = starshipConfig.imageSource;
      starshipImage.width = starshipConfig.imageWidth;
      starshipImage.height = starshipConfig.imageHeight;
      starshipImage.onload = () => {
        // Center the starship in the middle of the play field, two ship lengths above the bottom
        const x = (playFieldConfig.width - starshipConfig.width) / 2;
        const y = playFieldConfig.height - (starshipConfig.height * 3);
        this.starship = new Starship( x, y, starshipImage);
        resolve(); };
    });
  }

  startGameLoop() {
    this.draw();
    window.setInterval( () => {
      this.draw();
    }, 100);
  }

  draw() {
    this.context.clearRect(0, 0, playFieldConfig.width, playFieldConfig.height); // clear the entire play field
    if (this.showGrid) {
      this.drawGrid();
    }
    this.starship.draw(this.context);
  }

  onKeyboardEvent( event: KeyboardEvent, type: KeyboardEventType): void {
    switch (type) {
      case KeyboardEventType.KeyDown:
        switch (event.keyCode) {
          case Key.LeftArrow:
            this.starship.move(GameDirection.Left);
            break;
          case Key.UpArrow:
            this.starship.move(GameDirection.Up);
            break;
          case Key.RightArrow:
            this.starship.move(GameDirection.Right);
            break;
          case Key.DownArrow:
            this.starship.move(GameDirection.Down);
            break;
          case Key.Space:
            console.log('space bar');
        }
        break;
      case KeyboardEventType.KeyUp:
        console.log('keyup');
        break;
      default:
        break;
    }
    // this.startGameLoop();
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
