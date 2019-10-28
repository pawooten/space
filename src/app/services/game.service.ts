import { Injectable, Inject } from '@angular/core';

import { Key } from 'ts-keycode-enum';

import { playFieldConfig, starshipConfig, asteroidConfig } from '../config';
import { KeyboardEventType, GameDirection, AsteroidSize, ObjectPathType } from '../enumerations';
import { ImageLoaderService } from './image-loader.service';

import { Starship } from '../classes/starship';
import { PlayField } from '../classes/playfield';
import { Asteroid } from '../classes/asteroid';


@Injectable()
export class GameService {

  private starship: Starship;
  private playField: PlayField;
  private asteroid: Asteroid;

  public showGrid = false;

  context: CanvasRenderingContext2D;

  constructor( private imageLoaderService: ImageLoaderService) {}

  initialize(canvasElement: HTMLCanvasElement): void {
    this.context = canvasElement.getContext('2d');
    this.initializeStarship();
    this.playField = new PlayField();
    this.initializeAsteroid();
  }

  initializeStarship(): void {
      const x = (playFieldConfig.width - starshipConfig.width) / 2;
      const y = playFieldConfig.height - (starshipConfig.height * 3);
      this.starship = new Starship( x, y, this.imageLoaderService.Starship);
  }

  initializeAsteroid(): void {
    const x = 100;
    const y = 100;
    this.asteroid = new Asteroid( ObjectPathType.Straight, AsteroidSize.Medium, x, y, this.imageLoaderService.Asteroid);
  }
  startGameLoop() {
    this.draw();
    window.setInterval( () => {
      this.asteroid.followPath(this.playField);
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
