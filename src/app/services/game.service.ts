import { Injectable, Inject } from '@angular/core';

import { Key } from 'ts-keycode-enum';

import { playFieldConfig, starshipConfig, asteroidConfig } from '../config';
import { KeyboardEventType, GameDirection, ObjectPathType, ObjectType } from '../enumerations';
import { ImageLoaderService } from './image-loader.service';
import { DataLoaderService } from './data-loader.service';

import { Starship } from '../classes/starship';
import { PlayField } from '../classes/playfield';
import { Wave, WaveObject } from '../classes/wave';


@Injectable()
export class GameService {

  private starship: Starship;
  private playField: PlayField;

  private wave: Wave;

  public showGrid = false;

  context: CanvasRenderingContext2D;

  constructor( private imageLoaderService: ImageLoaderService, private dataLoaderService: DataLoaderService ) {}

  initialize(canvasElement: HTMLCanvasElement): void {
    this.context = canvasElement.getContext('2d');
    this.dataLoaderService.getTestLevel().subscribe((waveObjects: Array<WaveObject>) => {
      this.initializeStarship();
      this.playField = new PlayField();
      this.wave = new Wave( this.imageLoaderService, this.playField, waveObjects);
      });
  }

  initializeStarship(): void {
      const x = (playFieldConfig.width - starshipConfig.width) / 2;
      const y = playFieldConfig.height - (starshipConfig.height * 3);
      this.starship = new Starship( x, y, this.imageLoaderService.Starship);
  }

  startGameLoop() {
    this.draw();
    window.setInterval( () => {
      this.wave.Tick();
      this.draw();
    }, 100);
  }

  draw() {
    this.context.clearRect(0, 0, playFieldConfig.width, playFieldConfig.height); // clear the entire play field
    if (this.showGrid) {
      this.drawGrid();
    }
    this.starship.draw(this.context);
    this.wave.Draw(this.context);
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
