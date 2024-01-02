import { scenes } from 'umengine';
import { Tilemap, createPattern } from 'umengine/graphics';

export default async function createSprites(tileset: ImageBitmap) {
  const { context } = scenes;

  const TileSize = context.store.TileSize as number;
  const windowWidth = context.config.window.width;
  const windowHeight = context.config.window.height;

  const sprites = new Tilemap(tileset, TileSize, TileSize);

  sprites.slice('player', 8, 6);
  sprites.slice('crate', 2, 1);
  sprites.slice('crateSlot', 11, 8);
  sprites.slice('wallBrick', 8, 7);

  await createPattern(tileset, 11, 7, TileSize, TileSize, windowWidth - TileSize, windowHeight - TileSize).then(
    (grass) => sprites.add('grass', grass)
  );

  return sprites;
}
