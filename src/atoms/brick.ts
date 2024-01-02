import { scenes } from 'umengine';
import { Vector } from 'umengine/types';
import { Atom, SpriteRenderer, BoxCollider, Vector2H } from 'umengine/core';

export default function createWallBrick(sprite: ImageBitmap, position: Vector) {
  const { context } = scenes;
  const TileSize = context.store.TileSize as number;

  const wallBrick = new Atom('wall');
  wallBrick.tag = 'wall';
  wallBrick.layer = 'foreground';
  wallBrick.position = position;
  wallBrick.scale = { x: TileSize, y: TileSize };

  const spriteRenderer = new SpriteRenderer(wallBrick, sprite);
  spriteRenderer.order = 1;

  wallBrick.components.add(spriteRenderer);
  wallBrick.components.add(new BoxCollider(wallBrick));

  const blockedLocations = context.store.blockedLocations! as Set<string>;
  wallBrick.init = () => {
    blockedLocations.add(Vector2H.toString(position));
  };

  return wallBrick;
}
