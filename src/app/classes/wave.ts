import { GameObject } from './game-object';
import { ObjectType, ObjectPathType, AsteroidSize } from '../enumerations';
import { PathSprite } from './path-sprite';
import { Asteroid } from './asteroid';
import { create } from 'domain';
export interface WaveObject {
  Tick: number;
  Type: ObjectType;
  Path: ObjectPathType;
  X: number;
  Y: number;
};

export class Wave {

  private currentTick = 0;
  private maxTick = 0;

  private activeSprites: Array<PathSprite> = new Array<PathSprite>();
  constructor( private waveObjects: Array<WaveObject>) {
    for (const object of waveObjects) {
      if (object.Tick > this.maxTick) {
        this.maxTick = object.Tick;
      }
    }
  }

  Tick(): void {
    this.currentTick++;
    for (const object of this.waveObjects) {
      if (object.Tick === this.currentTick) {
        this.activeSprites.push(this.createSprite(object));
      }
    }
  }

  createSprite( waveObject: WaveObject): PathSprite {
    switch (waveObject.Type) {
      case ObjectType.SmallAsteroid:
        // return new Asteroid(waveObject.Path, AsteroidSize.Small, waveObject.X, waveObject.Y);
        break;
    }
    return null;
  }

  Draw(): void {

  }
}
