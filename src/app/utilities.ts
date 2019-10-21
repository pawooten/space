import { GameDirection as GameDirection} from './enumerations';

export class GameDirectionUtilities {
  static toOpposite( gameDirection: GameDirection): GameDirection {
    switch (gameDirection) {
      case GameDirection.Up: return GameDirection.Down; break;
      case GameDirection.Down: return GameDirection.Up; break;
      case GameDirection.Left: return GameDirection.Right; break;
      case GameDirection.Right: return GameDirection.Left; break;
    }
  }
}
