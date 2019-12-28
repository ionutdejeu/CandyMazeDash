import Phaser from 'phaser'
export default class Demo extends Phaser.Scene {
    joyStick:any;
    text:any;
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', Plugin, true);
    }

    create() {
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 400,
                y: 300,
                radius: 100,
                base: this.add.circle(0, 0, 10, 0x888888),
                thumb: this.add.circle(0, 0, 5, 0xcccccc),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            })
            .on('update', this.dumpJoyStickState, this);

        this.text = this.add.text(0, 0,'test');
        this.dumpJoyStickState();
    }

    dumpJoyStickState() {
        var cursorKeys = this.joyStick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += name + ' ';
            }
        }
        s += '\n';
        s += ('Force: ' + Math.floor(this.joyStick.force * 100) / 100 + '\n');
        s += ('Angle: ' + Math.floor(this.joyStick.angle * 100) / 100 + '\n');
        this.text.setText(s);
    }
}
