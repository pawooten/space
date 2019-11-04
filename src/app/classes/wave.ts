import { GameObject } from './game-object';
import { ObjectType, ObjectPathType, AsteroidSize } from '../enumerations';
import { PathSprite } from './path-sprite';
import { Asteroid } from './asteroid';
import { ImageLoaderService } from '../services/image-loader.service';

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
  constructor( private imageLoaderService: ImageLoaderService,
    private containerObject: GameObject, private waveObjects: Array<WaveObject>) {
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
    this.activeSprites.forEach( sprite => sprite.followPath(this.containerObject, this.currentTick));
  }

  createSprite( waveObject: WaveObject): PathSprite {
    switch (waveObject.Type) {
      case ObjectType.SmallAsteroid:
        return new Asteroid(waveObject.Path, AsteroidSize.Small, waveObject.X, waveObject.Y, this.imageLoaderService.Asteroid);
        break;
      case ObjectType.MediumAsteroid:
        return new Asteroid(waveObject.Path, AsteroidSize.Medium, waveObject.X, waveObject.Y, this.imageLoaderService.Asteroid);
        break;
      case ObjectType.LargeAsteroid:
        return new Asteroid(waveObject.Path, AsteroidSize.Large, waveObject.X, waveObject.Y, this.imageLoaderService.Asteroid);
        break;
      }
    return null;
  }

  Draw(context: CanvasRenderingContext2D): void {
    this.activeSprites.forEach(sprite => sprite.Draw(context));
  }
}
