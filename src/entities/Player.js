import Phaser from "phaser";
import Graphics from "../assets/Graphics";
import { VirtualJoystickKeys } from "../scenes/JoyStickScene";

const speed = 125;
const attackSpeed = 500;
const attackDuration = 165;
const attackCooldown = attackDuration * 2;


export default class Player {
  sprite=null;
  keys=null;

  attackUntil=null
  attackLockedUntil=null;
  emitter=null;
  body=null;

  constructor(x, y, scene) {
    this.sprite = scene.physics.add.sprite(x, y, Graphics.player.name, 0);
    this.sprite.setSize(8, 8);
    this.sprite.setOffset(12, 20);
    this.sprite.anims.play(Graphics.player.animations.idle.name);

    this.keys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      w: "w",
      a: "a",
      s: "s",
      d: "d"
    });

    this.attackUntil = 0;
    this.attackLockedUntil = 0;
    const particles = scene.add.particles(Graphics.player.name);
    this.emitter = particles.createEmitter({
      alpha: { start: 0.7, end: 0, ease: "Cubic.easeOut" },
      follow: this.sprite,
      quantity: 1,
      lifespan: 200,
      blendMode: Phaser.BlendModes.ADD,
      scaleX: () => (this.sprite.flipX ? -1 : 1),
      emitCallback: (particle) => {
        particle.frame = this.sprite.frame;
      }
    });
    this.emitter.stop();

    this.body = this.sprite.body;
  }

  update(time,virtualKeys) {
    const keys = this.keys;
    let attackAnim = "";
    let moveAnim = "";

    if (time < this.attackUntil) {
      return;
    }
    this.body.setVelocity(0);

    const left = keys.left.isDown || keys.a.isDown || virtualKeys.left;
    const right = keys.right.isDown || keys.d.isDown || virtualKeys.right;
    const up = keys.up.isDown || keys.w.isDown || virtualKeys.up;
    const down = keys.down.isDown || keys.s.isDown || virtualKeys.down;

    if (!this.body.blocked.left && left) {
      this.body.setVelocityX(-speed);
      this.sprite.setFlipX(true);
    } else if (!this.body.blocked.right && right) {
      this.body.setVelocityX(speed);
      this.sprite.setFlipX(false);
    }

    if (!this.body.blocked.up && up) {
      this.body.setVelocityY(-speed);
    } else if (!this.body.blocked.down && down) {
      this.body.setVelocityY(speed);
    }

    if (left || right) {
      moveAnim = Graphics.player.animations.walk.name;
      attackAnim = Graphics.player.animations.slash.name;
    } else if (down) {
      moveAnim = Graphics.player.animations.walk.name;
      attackAnim = Graphics.player.animations.slashDown.name;
    } else if (up) {
      moveAnim = Graphics.player.animations.walkBack.name;
      attackAnim = Graphics.player.animations.slashUp.name;
    } else {
      moveAnim = Graphics.player.animations.idle.name;
    }

    if (
      (keys.space.isDown || virtualKeys.actionButtonA) &&
      time > this.attackLockedUntil &&
      this.body.velocity.length() > 0
    ) {
      this.attackUntil = time + attackDuration;
      this.attackLockedUntil = time + attackDuration + attackCooldown;
      this.body.velocity.normalize().scale(attackSpeed);
      this.sprite.anims.play(attackAnim, true);
      this.emitter.start();
      this.sprite.setBlendMode(Phaser.BlendModes.ADD);
    } else {
      this.sprite.anims.play(moveAnim, true);
      this.body.velocity.normalize().scale(speed);
      this.sprite.setBlendMode(Phaser.BlendModes.NORMAL);
      if (this.emitter.on) {
        this.emitter.stop();
      }
    }
  }
}
