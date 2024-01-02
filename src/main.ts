import { init } from 'umengine';
import loadLevel from './levels/factory';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('screen') as HTMLCanvasElement;
  init(canvas)
    .then(() => loadLevel('2'))
    .catch((err) => console.error(err));
});

// // for debugging purpose
// ['mousedown', 'mousemove'].forEach(eventName => {
//   game.window.addEventListener(eventName, event => {
//     if (event.buttons === 1) {
//       player.transform.position.set(event.offsetX, event.offsetY);
//     }
//   });
// });
