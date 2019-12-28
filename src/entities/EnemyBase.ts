import Graphics from "../assets/Graphics";
import EnemyBehaviour from "./EnemyBehaviour";

export default class EnemyBase {
    public sprite: Phaser.Physics.Arcade.Sprite;
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    private body: Phaser.Physics.Arcade.Body;

    constructor(x: number, y: number, scene: Phaser.Scene,enemyBehaviour:EnemyBehaviour) {

        this.sprite = scene.physics.add.sprite(x, y, Graphics.slime.name, 0);
        this.sprite.setSize(8, 8);
        this.sprite.setOffset(12, 20);
        
        this.sprite.anims.play(Graphics.player.animations.idle.name);
        const particles = scene.add.particles(Graphics.slime.name);
        this.emitter = particles.createEmitter({
            alpha: { start: 0.7, end: 0, ease: "Cubic.easeOut" },
            follow: this.sprite,
            quantity: 1,
            lifespan: 200,
            blendMode: Phaser.BlendModes.ADD,
            scaleX: () => (this.sprite.flipX ? -1 : 1),
            emitCallback: (particle: Phaser.GameObjects.Particles.Particle) => {
                particle.frame = this.sprite.frame;
            }
        });
        this.emitter.stop();

        this.body = <Phaser.Physics.Arcade.Body>this.sprite.body;
    }
}