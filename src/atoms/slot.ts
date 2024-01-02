import { scenes } from 'umengine';
import { Vector } from 'umengine/types';
import { Atom, BoxCollider, SpriteRenderer, Vector2H } from 'umengine/core';

export default function createCrateSlot(sprite: ImageBitmap, position: Vector) {
  const { store } = scenes.context;
  const TileSize = store.TileSize as number;

  const slot = new Atom('slot');
  slot.tag = 'slot';
  slot.layer = 'foreground';
  slot.position = position;
  slot.scale = { x: TileSize, y: TileSize };
  slot.data.filledWith = null;

  const spriteRenderer = new SpriteRenderer(slot, sprite);
  spriteRenderer.order = 2;

  slot.components.add(spriteRenderer);
  slot.components.add(new BoxCollider(slot));

  /** game logic start */

  slot.collision = (other) => {
    if (other.tag === 'crate') {
      const overlapping = Vector2H.equal(slot.position, other.position);
      if (overlapping && slot.data.filledWith === null) {
        slot.data.filledWith = other.id;
        (store.score as number) += 1;
      } else if (!overlapping && slot.data.filledWith === other.id) {
        slot.data.filledWith = null;
        (store.score as number) -= 1;
      }
    }
  };

  /** game logic end */

  return slot;
}
