import { scenes } from 'umengine';
import { Vector } from 'umengine/types';
import { Atom, Sprite, Vector2H } from 'umengine/core';

export default function createCrate(sprite: ImageBitmap, position: Vector) {
  const { context } = scenes;
  const TileSize = context.store.TileSize as number;

  const crate = new Atom('crate');
  crate.layer = 'foreground';
  crate.tag = 'crate';
  crate.position = position;
  crate.scale = { x: TileSize, y: TileSize };
  crate.components.add('BoxCollider');
  const spriteComponent = crate.components.add<Sprite>('Sprite');
  spriteComponent.image = sprite;
  spriteComponent.order = 3;

  const blockedLocations = context.store.blockedLocations as Set<string>;

  /** game logic start */

  crate.init = () => {
    crate.data.readyToMove = false;
    blockedLocations.add(Vector2H.toString(position));
  };

  (crate as any).movementBlocked = (direction: Vector) => {
    return blockedLocations.has(Vector2H.toString(direction));
  };

  (crate as any).move = (direction: Vector) => {
    if (!(crate as any).movementBlocked(direction)) {
      blockedLocations.delete(Vector2H.toString(crate.position));
      crate.position = direction;
      blockedLocations.add(Vector2H.toString(direction));
    }
  };

  crate.collision = (other) => {
    if (other.name === 'player') {
      const playerPosition = other.position;
      const cratePosition = crate.position;
      const direction = Vector2H.sub(cratePosition, playerPosition);
      crate.data.readyToMove = Vector2H.magnitude(direction) === 64;
    }
  };

  crate.collisionEnd = (other) => {
    if (other.name === 'player') {
      crate.data.readyToMove = false;
    }
  };

  /** game logic end */

  return crate;
}
