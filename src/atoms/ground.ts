import { scenes } from 'umengine';
import { Atom, Sprite } from 'umengine/core';

export default function createGround(sprite: ImageBitmap) {
  const { context } = scenes;

  const ground = new Atom('ground');
  ground.layer = 'background';
  ground.scale = {
    x: context.config.window.width,
    y: context.config.window.height,
  };
  const spriteComponent = ground.components.add<Sprite>('Sprite');
  spriteComponent.image = sprite;

  return ground;
}
