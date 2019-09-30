import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from './services/app.service';
import { GameService } from './services/game.service';

import { playField } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;
  subscription: any;

  private _isLoaded = false;
  get isLoaded(): boolean {
    return this._isLoaded;
  }

  constructor( private appService: AppService, private gameService: GameService ) {
  }

  public ngAfterViewInit(): void {
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    this.appService.createPlayGround(canvasElement);
    this.subscription = this.appService.getImageLoadEmitter()
    .subscribe(() => {
      this._isLoaded = true;
      this.onResize(window);
    });
  }

  onResize(eventTarget: any) {
    const dpi = window.devicePixelRatio;
    const canvasElement = this.canvas.nativeElement;
    canvasElement.setAttribute('width', dpi * playField.width);
    canvasElement.setAttribute('height', dpi * playField.height);
    this.gameService.startGameLoop();
  }
}
