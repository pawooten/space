import { ObjectType, ObjectPathType } from '../enumerations';
import { WaveObject } from '../classes/wave';

const level: Array<WaveObject> = [
  { Tick: 10, Type: ObjectType.SmallAsteroid, Path: ObjectPathType.Straight, X: 40, Y: 100 },
  { Tick: 10, Type: ObjectType.MediumAsteroid, Path: ObjectPathType.Straight, X: 140, Y: 100 },
  { Tick: 10, Type: ObjectType.LargeAsteroid, Path: ObjectPathType.Straight, X: 240, Y: 100 },
  { Tick: 100, Type: ObjectType.SmallAsteroid, Path: ObjectPathType.Straight, X: 40, Y: 100 },
  { Tick: 100, Type: ObjectType.MediumAsteroid, Path: ObjectPathType.Straight, X: 140, Y: 100 },
  { Tick: 100, Type: ObjectType.LargeAsteroid, Path: ObjectPathType.Straight, X: 240, Y: 100 }];
