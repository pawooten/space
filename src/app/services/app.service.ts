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
    this.gameService.onKeyboardEvent(event, type);
  }
}
