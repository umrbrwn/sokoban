import { scenes } from 'umengine';
import { Atom, SpriteRenderer } from 'umengine/core';

export default function createGround(sprite: ImageBitmap) {
  const { context } = scenes;

  const ground = new Atom('ground');
  ground.layer = 'background';
  ground.scale = {
    x: context.config.window.width,
    y: context.config.window.height,
  };

  ground.components.add(new SpriteRenderer(ground, sprite));

  return ground;
}
