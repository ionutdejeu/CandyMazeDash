import Graphics from "../assets/Graphics";
import { GameObjects } from "phaser";

export default class ArcadePickupObject { 
    sprite=null;
    emitter=null;
    body=null;

    constructor(x, y, scene,player){
        this.sprite = scene.physics.add.sprite(x, y, Graphics.items.name, 0);
        this.sprite.setSize(8, 8);
        this.sprite.setOffset(12, 20);
        
        const particles = scene.add.particles(Graphics.items.name);
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
        scene.physics.add.collider(this.body.gameObject,player,()=>{
            console.log('pickup item');
            // destroy the arcade body
            this.sprite.body.gameObject.destroy();
        });
    }

    update(){
        
        
    }

    getSpriteBody(){ return this.body};
}