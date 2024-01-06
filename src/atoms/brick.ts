import { scenes } from 'umengine';
import { Vector } from 'umengine/types';
import { Atom, Sprite, Vector2H } from 'umengine/core';

export default function createWallBrick(sprite: ImageBitmap, position: Vector) {
  const { context } = scenes;
  const TileSize = context.store.TileSize as number;

  const brick = new Atom('brick');
  brick.tag = 'wall';
  brick.layer = 'foreground';
  brick.position = position;
  brick.scale = { x: TileSize, y: TileSize };
  brick.components.add('BoxCollider');
  brick.components.add('FixedBody');
  const spriteComponent = brick.components.add<Sprite>('Sprite');
  spriteComponent.image = sprite;
  spriteComponent.order = 1;

  const blockedLocations = context.store.blockedLocations! as Set<string>;
  brick.init = () => {
    blockedLocations.add(Vector2H.toString(position));
  };

  return brick;
}
