import Phaser from "phaser";
import InfoScene from "./scenes/InfoScene";
import ReferenceScene from "./scenes/ReferenceScene";
import DungeonScene from "./scenes/DungeonScene";
import JoyStickScene from "./scenes/JoyStickScene";
 
export function initialize() {
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
    // Handle the Cordova pause and resume events
    document.addEventListener('pause', onPause, false);
    document.addEventListener('resume', onResume, false);

    // Initialize the game 
    const game = new Phaser.Game({
      type: Phaser.WEBGL,
      // TODO: OnResize
      width: window.innerWidth,
      height: window.innerHeight,
      render: { pixelArt: true },
      physics: { default: "arcade", arcade: { debug: false, gravity: { y: 0 } } },
      scene: [DungeonScene,JoyStickScene,  InfoScene, ReferenceScene]
    });
    
    setUpHotReload();
    window.addEventListener("resize", () => {
      //game.resize(window.innerWidth, window.innerHeight);
    });
} 
 
function onPause() {
    // TODO: This application has been suspended. Save application state here.
}

function onResume() {
    // TODO: This application has been reactivated. Restore application state here.
}

function setUpHotReload() {
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept(() => {});
    // @ts-ignore
    module.hot.dispose(() => {
      window.location.reload();
    });
  }
}

initialize();