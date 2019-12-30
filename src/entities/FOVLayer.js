import Graphics from "../assets/Graphics";
import Map from "../entities/Map";
import Mrpas from "mrpas";
import Phaser from "phaser";

const radius = 7;
const fogAlpha = 0.8;

const lightDropoff = [0.7, 0.6, 0.3, 0.1];

// Alpha to transition per MS given maximum distance between desired
// and actual alpha
const alphaPerMs = 0.004;

function updateTileAlpha(
  desiredAlpha,
  delta,
  tile
) {
  // Update faster the further away we are from the desired value,
  // but restrict the lower bound so we don't get it slowing
  // down infinitley.
  const distance = Math.max(Math.abs(tile.alpha - desiredAlpha), 0.05);
  const updateFactor = alphaPerMs * delta * distance;
  if (tile.alpha > desiredAlpha) {
    tile.setAlpha(Phaser.Math.MinSub(tile.alpha, updateFactor, desiredAlpha));
  } else if (tile.alpha < desiredAlpha) {
    tile.setAlpha(Phaser.Math.MaxAdd(tile.alpha, updateFactor, desiredAlpha));
  }
}

export default class FOVLayer {
  layer=null;
  mrpas=null;
  lastPos=null;
  map=null;

  constructor(map) {
    const utilTiles = map.tilemap.addTilesetImage("util");

    this.layer = map.tilemap
      .createBlankDynamicLayer("Dark", utilTiles, 0, 0)
      .fill(Graphics.util.indices.black);

    this.mrpas = new Mrpas(map.width, map.height, (x, y) => {
      return map.tiles[y] && !map.tiles[y][x].collides;
    });

    this.lastPos = new Phaser.Math.Vector2({ x: -1, y: -1 });
    this.map = map;
  }

  update(
    pos,
    bounds,
    delta
  ) {
    if (!this.lastPos.equals(pos)) {
      this.updateMRPAS(pos);
      this.lastPos = pos.clone();
    }

    for (let y = bounds.y; y < bounds.y + bounds.height; y++) {
      for (let x = bounds.x; x < bounds.x + bounds.width; x++) {
        if (y < 0 || y >= this.map.height || x < 0 || x >= this.map.width) {
          continue;
        }
        const desiredAlpha = this.map.tiles[y][x].desiredAlpha;
        const tile = this.layer.getTileAt(x, y);
        updateTileAlpha(desiredAlpha, delta, tile);
      }
    }
  }

  updateMRPAS(pos) {
    // TODO: performance?
    this.map.tiles.forEach(r =>
      r.forEach(t => {
        if (t.seen) {
          t.desiredAlpha = fogAlpha;
        }
      })
    );

    this.mrpas.compute(
      pos.x,
      pos.y,
      radius,
      (x, y) => this.map.tiles[y][x].seen,
      (x, y) => {
        const distance = Math.floor(
          new Phaser.Math.Vector2(x, y).distance(
            new Phaser.Math.Vector2(pos.x, pos.y)
          )
        );

        const rolloffIdx = distance <= radius ? radius - distance : 0;
        const alpha =
          rolloffIdx < lightDropoff.length ? lightDropoff[rolloffIdx] : 0;
        this.map.tiles[y][x].desiredAlpha = alpha;
        this.map.tiles[y][x].seen = true;
      }
    );
  }
}
