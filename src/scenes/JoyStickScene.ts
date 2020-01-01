import Phaser, { GameObjects } from "phaser";
import transparentLight01 from "../../assets/ui/transparentLight/transparentLight01.png";
import transparentLight03 from "../../assets/ui/transparentLight/transparentLight03.png";
import transparentLight04 from "../../assets/ui/transparentLight/transparentLight04.png";
import transparentLight08 from "../../assets/ui/transparentLight/transparentLight08.png";
import transparentLight34 from "../../assets/ui/transparentLight/transparentLight34.png";
import Graphics from "../assets/Graphics";
 
export interface VirtualJoystickKeys{
    up:boolean;
    down:boolean;
    left:boolean;
    right:boolean;
    actionButtonA:boolean;
}
export default class JoyStickScene extends Phaser.Scene{
    clickCountText:any|null;
    text:any;
    up_pressed:boolean=false;
    left_pressed:boolean=false;
    right_pressed:boolean=false;
    down_pressed:boolean=false;
    actionButtonA:boolean=false;
     
    constructor(){
        super({key:'JoyStickTestScene'});
        
    }
    
    
    preload(): void {
        this.load.image(Graphics.ui_joystick_down.name,
            Graphics.ui_joystick_down.file);
        this.load.image(Graphics.ui_joystick_left.name,
            Graphics.ui_joystick_left.file);
        this.load.image(Graphics.ui_joystick_up.name,
            Graphics.ui_joystick_up.file);
        this.load.image(Graphics.ui_joystick_right.name,
            Graphics.ui_joystick_right.file);
        this.load.image(Graphics.ui_actionButtons_A.name,
            Graphics.ui_actionButtons_A.file);
    }
    create():void{
        console.log('scene created');
        
        this.input.keyboard.on("keydown_J",()=>{
            console.log('Starting Dungeon Scene');
            this.scene.start("DungeonScene");
        });
       
        this.input.keyboard.on("keydown_J",()=>{
            console.log('Starting Dungeon Scene');
            this.scene.start("DungeonScene");
        });
       
        let container = this.add.container(200,200);
        container.setScrollFactor(0,0);
        container.setDepth(-999);
        const upPadButton = this.add.image(-40,-76,Graphics.ui_joystick_up.name)
        
        upPadButton.setInteractive()
        .on('pointerdown', (e) => {this.up_pressed = true; } )
        .on('pointerover', (e) => {console.log(e)} )
        .on('pointerout', (e) => {this.up_pressed=false;} );
        
        const leftPadButton = this.add.image(-80,-30,Graphics.ui_joystick_left.name)
        
        leftPadButton.setInteractive()
        .on('pointerdown', (e) => {this.left_pressed = true; } )
        .on('pointerover', (e) => {console.log(e)} )
        .on('pointerout', (e) => {this.left_pressed = false; } );
        
        const rightPadButton = this.add.image(0,-30,Graphics.ui_joystick_right.name)
        
        rightPadButton.setInteractive()
        .on('pointerdown', (e) => {this.right_pressed = true; } )
        .on('pointerover', (e) => {console.log(e)} )
        .on('pointerout', (e) => {this.right_pressed = false; }  );

        const downPadButton = this.add.image(-40,14,Graphics.ui_joystick_down.name)
        
        downPadButton.setInteractive()
        .on('pointerdown',(e) => {this.down_pressed = true; }  )
        .on('pointerover', (e) => {console.log(e)} )
        .on('pointerout', (e) => {this.down_pressed = false; } );

        container.add([upPadButton,downPadButton,leftPadButton,rightPadButton]);

        let actionsButtonsContainer = this.add.container(400,200);
        actionsButtonsContainer.setScrollFactor(0,0);
        actionsButtonsContainer.setDepth(-999);

       
        const jumpButton = this.add.image(0,0,Graphics.ui_actionButtons_A.name)
        
        jumpButton.setInteractive()
        .on('pointerdown',(e) => {this.actionButtonA = true; }  )
        .on('pointerover', (e) => {console.log(e)} )
        .on('pointerout', (e) => {this.actionButtonA = false; } );

        actionsButtonsContainer.add([jumpButton]);

    }

    public getCursorKeys():any
    {
        return {
            up:this.up_pressed,
            down:this.down_pressed,
            left:this.left_pressed,
            right:this.right_pressed,
            actionButtonA:this.actionButtonA
        };
    } 
}