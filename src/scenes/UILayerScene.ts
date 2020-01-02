import Phaser, { GameObjects } from "phaser";
import Graphics from "../assets/Graphics";
 
export interface VirtualJoystickKeys{
    up:boolean;
    down:boolean;
    left:boolean;
    right:boolean;
    actionButtonA:boolean;
}
export default class UILayerScene extends Phaser.Scene{
    clickCountText:any|null;
    text:any;
    up_pressed:boolean=false;
    left_pressed:boolean=false;
    right_pressed:boolean=false;
    down_pressed:boolean=false;
    actionButtonA:boolean=false;
    joystickContainer:GameObjects.Container;
    actionButtonsContainer:GameObjects.Container;

    constructor(){
        super({key:'UILayer'});
        
        
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
       
        let posY = this.game.scale.height-100;
        this.joystickContainer = this.add.container(150,posY);

        this.joystickContainer.setScrollFactor(0,0);
        this.joystickContainer.setDepth(-999);
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

        this.joystickContainer.add([upPadButton,downPadButton,leftPadButton,rightPadButton]);
    
        this.actionButtonsContainer = this.add.container(400,200);
        this.actionButtonsContainer.setScrollFactor(0,0);
        this.actionButtonsContainer.setDepth(-999);

       
        const jumpButton = this.add.image(0,0,Graphics.ui_actionButtons_A.name)
        
        jumpButton.setInteractive()
        .on('pointerdown',(e) => {this.actionButtonA = true; }  )
        .on('pointerover', (e) => {console.log(e)} )
        .on('pointerout', (e) => {this.actionButtonA = false; } );

        this.actionButtonsContainer.add([jumpButton]);
        
        
        
    }

    public onCanvasResizeEvent(gameSize, baseSize, displaySize, resolution, previousWidth, previousHeight){
        console.log('resized window',this.joystickContainer,this.actionButtonsContainer);
        if(this.joystickContainer!== undefined){
            this.joystickContainer.setPosition(150,gameSize.height-150);
        }
        if(this.actionButtonsContainer !==undefined){
            this.actionButtonsContainer.setPosition(gameSize.width-100,gameSize.height-100);
        }
    }
    public repositionUiContainers(gameSize){
        
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