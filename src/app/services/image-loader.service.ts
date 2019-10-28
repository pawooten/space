import { Injectable } from '@angular/core';
import { starshipConfig, asteroidConfig } from '../config';

@Injectable()
export class ImageLoaderService {
  Starship: HTMLImageElement;
  Asteroid: HTMLImageElement;

  loadAssets(): Promise<void[]> {
    const promises: Promise<void>[] = [];
    promises.push(this.loadStarship());
    promises.push(this.loadAsteroid());
    return Promise.all(promises);
  }

  loadStarship(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.Starship = new Image();
      this.Starship.src = starshipConfig.imageSource;
      this.Starship.width = starshipConfig.imageWidth;
      this.Starship.height = starshipConfig.imageHeight;
      resolve();
    });
  }

  loadAsteroid(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.Asteroid = new Image();
      this.Asteroid.src = asteroidConfig.imageSource;
      this.Asteroid.width = asteroidConfig.imageWidth;
      this.Asteroid.height = asteroidConfig.imageHeight;
      resolve();
    });
  }
}
