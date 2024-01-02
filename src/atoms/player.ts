import { scenes, inputs } from 'umengine';
import { Atom, SpriteRenderer, BoxCollider, Vector2H } from 'umengine/core';
import { Vector } from 'umengine/types';

export default function createPlayer(sprite: ImageBitmap, position: Vector) {
  const { context } = scenes;
  const TileSize = context.store.TileSize as number;

  const player = new Atom('player');
  player.layer = 'foreground';
  player.scale = { x: TileSize, y: TileSize };
  const spriteRenderer = new SpriteRenderer(player, sprite);
  spriteRenderer.order = 4;
  player.components.add(spriteRenderer);
  player.components.add(new BoxCollider(player));

  /** game logic start */

  let movementDirection = Vector2H.zero();
  let playerNewPosition = position;
  let isInputLocked = false;
  let cleared = false;

  const levelCleared = () => context.store.score === context.store.clearingScore;

  const move = () => {
    movementDirection = Vector2H.zero();
    if (inputs.isKeyUp('UP')) {
      movementDirection.y = -1;
    } else if (inputs.isKeyUp('DOWN')) {
      movementDirection.y = 1;
    } else if (inputs.isKeyUp('RIGHT')) {
      movementDirection.x = 1;
    } else if (inputs.isKeyUp('LEFT')) {
      movementDirection.x = -1;
    }
    return Vector2H.magnitude(movementDirection) > 0;
  };

  player.update = () => {
    player.position = playerNewPosition;
    if (levelCleared() && !cleared) {
      cleared = true;
      console.log('HURRAY');
      return;
    }
    if (move()) {
      isInputLocked = true;
      movementDirection = Vector2H.mulScaler(movementDirection, TileSize);
      playerNewPosition = Vector2H.add(player.position, movementDirection);
    }
  };

  player.collision = (other) => {
    if (other.tag === 'wall') {
      if (Vector2H.equal(other.position, playerNewPosition)) {
        playerNewPosition = player.position;
      }
    } else if (other.tag === 'crate') {
      const playerPosition = player.position;
      const cratePosition = other.position;
      if (other.data.readyToMove && Vector2H.equal(playerNewPosition, cratePosition)) {
        const crateNewPosition = Vector2H.add(cratePosition, movementDirection);
        if ((other as any).movementBlocked(crateNewPosition)) {
          playerNewPosition = playerPosition;
        } else {
          (other as any).move(crateNewPosition);
          other.data.readyToMove = false;
        }
      }
    }
  };

  player.collisionEnd = ({ tag, data }) => {
    if (tag === 'crate' && data) {
      data.readyToMove = false;
    }
  };

  /** game logic end */

  return player;
}
