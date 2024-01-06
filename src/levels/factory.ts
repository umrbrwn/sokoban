import { scenes } from 'umengine';
import createSprites from '../atoms/sprites';
import createGround from '../atoms/ground';
import createPlayer from '../atoms/player';
import createCrate from '../atoms/crate';
import createWallBrick from '../atoms/brick';
import createCrateSlot from '../atoms/slot';
import { loaders } from 'umengine/utils';
import { Vector2H } from 'umengine/core';

// 0 = ground, 1 = player, 2 = crate, 3 = wall, 4 = slot

export default async function loadLevel(levelNum: string) {
  const [tileset, levels] = await Promise.all([
    loaders.loadImage('src/assets/sokoban_tilesheet.png'),
    loaders.loadJSON('src/levels/map.json'),
  ]);
  const { store } = scenes.context;

  const TileSize = 64;
  store.TileSize = TileSize;

  const currentLevel = levels.find((l) => l.level === levelNum);
  store.clearingScore = currentLevel.clearingScore;
  store.score = 0;
  store.blockedLocations = new Set<string>();

  const scene = scenes.current;
  scene.layerComposer.add('background');
  scene.layerComposer.add('foreground');

  const sprites = await createSprites(tileset);

  scene.addItem(createGround(sprites.get('grass')!));

  currentLevel.map.forEach((row: [], rowIndex: number) => {
    row.forEach((column: number, columnIndex: number) => {
      let position = Vector2H.mulScaler({ x: columnIndex, y: rowIndex }, TileSize);
      switch (column) {
        case 1:
          scene.addItem(createPlayer(sprites.get('player')!, position));
          break;
        case 2:
          scene.addItem(createCrate(sprites.get('crate')!, position));
          break;
        case 3:
          scene.addItem(createWallBrick(sprites.get('wallBrick')!, position));
          break;
        case 4:
          scene.addItem(createCrateSlot(sprites.get('crateSlot')!, position));
          break;
      }
    });
  });
}
