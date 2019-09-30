import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ScoreService {
  private _highScore = 1000;
  get highScore(): number {
    return this._highScore;
  }

  private _currentScore = 0;
  get currentScore(): number {
    return this._currentScore;
  }

  private _currentStage = 1;
  get currentStage(): number {
    return this._currentStage;
  }
}
