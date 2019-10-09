import { Injectable, EventEmitter } from '@angular/core';
import { GameService } from './game.service';

import { Key } from 'ts-keycode-enum';
import { KeyboardEventType } from '../enumerations';

@Injectable()
export class AppService {

  isImageLoaded: EventEmitter<number> = new EventEmitter();

  constructor(private gameService: GameService ) {}

  createPlayGround( canvasElement: HTMLCanvasElement): void {
    this.gameService.loadAssets(canvasElement).then( (image) => {
      setTimeout( () => {
        this.isImageLoaded.emit();
      }, 1000);
    });
  }

  getImageLoadEmitter() {
    return this.isImageLoaded;
  }

  onKeyboardEvent( event: KeyboardEvent, type: KeyboardEventType): void {
    switch (type) {
      case KeyboardEventType.KeyDown:
        switch (event.keyCode) {
          case Key.LeftArrow:
            console.log('left');
            break;
          case Key.UpArrow:
            console.log('up');
            break;
          case Key.RightArrow:
            console.log('right');
            break;
          case Key.DownArrow:
            console.log('down');
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
  }
}
