import { GameObject } from './game-object';
import { playFieldConfig } from '../config';

export class PlayField extends GameObject {
  get Width(): number {
    return playFieldConfig.width;
  }

  get Height(): number {
    return playFieldConfig.height;
  }

  constructor() {
    super(0, 0);
  }
}
