import { Injectable, EventEmitter } from '@angular/core';
import { GameService } from './game.service';
import { ImageLoaderService } from './image-loader.service';

import { KeyboardEventType } from '../enumerations';

@Injectable()
export class AppService {

  initialized: EventEmitter<number> = new EventEmitter();

  constructor(private gameService: GameService, private imageLoaderService: ImageLoaderService ) {}

  createPlayGround( canvasElement: HTMLCanvasElement): void {
    this.imageLoaderService.loadAssets().then(() => {
      this.gameService.initialize(canvasElement);
      setTimeout( () => {
        this.initialized.emit();
      }, 1000);
      });
  }

  getImageLoadEmitter() {
    return this.initialized;
  }

  onKeyboardEvent( event: KeyboardEvent, type: KeyboardEventType): void {
    this.gameService.onKeyboardEvent(event, type);
  }
}
