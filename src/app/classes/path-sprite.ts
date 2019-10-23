import { Sprite } from './sprite';
import { GameDirection, SpritePathType } from '../enumerations';
import { GameObject } from './game-object';
import { EventEmitter, Output } from '@angular/core';

export abstract class PathSprite extends Sprite {

  @Output() pathEndReached: EventEmitter<any> = new EventEmitter();

  constructor ( private path: SpritePathType,  x: number, y: number)
  {
    super(x, y);
  }

  followPath(container: GameObject): void {
    switch ( this.path )
    {
      case SpritePathType.Straight:
        if (!this.move(GameDirection.Down, container)) {
          // Following the path has resulted in a move which failed. Interpret this as reaching the end of the path
          this.pathEndReached.emit(null);
        }
        break;
    }
  }
}
