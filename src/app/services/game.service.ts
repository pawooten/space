import { Injectable, Inject } from '@angular/core';

import { Key } from 'ts-keycode-enum';

import { Starship } from '../classes/starship';
import { playFieldConfig, starshipConfig, asteroidConfig } from '../config';
import { KeyboardEventType, GameDirection } from '../enumerations';
import { PlayField } from '../classes/playfield';
import { Asteroid } from '../classes/asteroid';


@Injectable()
export class GameService {

  private starship: Starship;
  private playField: PlayField;
  private asteroid: Asteroid;

  public showGrid = false;

  context: CanvasRenderingContext2D;

  loadAssets(canvasElement: HTMLCanvasElement): Promise<void[]> {
    this.context = canvasElement.getContext('2d');
    const promises: Promise<void>[] = [];
    promises.push(this.loadStarship());
    promises.push(this.loadPlayField());
    promises.push(this.loadAsteroid());
    return Promise.all(promises);
  }

  loadStarship(): Promise<void> {
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

        resolve();
      };
    });
  }

  loadAsteroid(): Promise<void> {
    return new Promise((resolve, reject) => {
      const asteroidImage = new Image();
      asteroidImage.src = asteroidConfig.imageSource;
      asteroidImage.width = asteroidConfig.imageWidth;
      asteroidImage.height = asteroidConfig.imageHeight;
      asteroidImage.onload = () => {
        const x = 100;
        const y = 100;
        this.asteroid = new Asteroid( x, y, asteroidImage);

        resolve();
      };
    });
  }

  loadPlayField(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.playField = new PlayField();
      resolve();
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
    this.asteroid.draw(this.context);
  }

  onKeyboardEvent( event: KeyboardEvent, type: KeyboardEventType): void {
    switch (type) {
      case KeyboardEventType.KeyDown:
        switch (event.keyCode) {
          case Key.LeftArrow:
            this.starship.move(GameDirection.Left, this.playField);
            break;
          case Key.UpArrow:
            this.starship.move(GameDirection.Up, this.playField);
            break;
          case Key.RightArrow:
            this.starship.move(GameDirection.Right, this.playField);
            break;
          case Key.DownArrow:
            this.starship.move(GameDirection.Down, this.playField);
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
