import { Sprite } from './sprite';
import { GameDirection, ObjectPathType } from '../enumerations';
import { GameObject } from './game-object';
import { EventEmitter, Output } from '@angular/core';

export abstract class PathSprite extends Sprite {

  @Output() pathEndReached: EventEmitter<any> = new EventEmitter();

  private tickModulus: number;
  constructor ( private path: ObjectPathType,  x: number, y: number) {
    super(x, y);

    this.tickModulus = Math.round(Math.random() * 40) + 10;
  }

  followPath(container: GameObject, tick: number): void {
    switch ( this.path ) {
      case ObjectPathType.Straight:
        if (!this.move(GameDirection.Down, container)) {
          // Following the path has resulted in a move which failed. Interpret this as reaching the end of the path
          this.pathEndReached.emit(null);
        }
        break;
      case ObjectPathType.ZigZag:
        const remainder = tick % this.tickModulus;
        if (remainder < (Math.round(this.tickModulus / 2)))  {
          if (!this.move(GameDirection.Right, container)) {
            this.move(GameDirection.Left, container);
          }

        } else {
          if (!this.move(GameDirection.Left, container)) {
            this.move(GameDirection.Right, container);
          }
        }
        if (!this.move(GameDirection.Down, container)) {
          // Following the path has resulted in a move which failed. Interpret this as reaching the end of the path
          this.pathEndReached.emit(null);
        }
        break;
    }
  }
}
