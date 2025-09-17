import { Scene } from 'phaser';

import "@fontsource/press-start-2p"

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background').setScale(1.5);

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(5, 0x000000);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0x00ff00);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png',);
        
        this.load.spritesheet('player', 'black-man-sprite.png', { frameWidth: 70, frameHeight: 100 });

        // Audio
        this.load.audio('walkSfx', 'audio/walking_sfx.wav');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        const anims = [
            { key: 'turn', start: 0, end: 0, frameRate: 20, repeat: 0 },
            { key: 'right', start: 4, end: 7, frameRate: 8, repeat: -1 },
            { key: 'left', start: 8, end: 11, frameRate: 8, repeat: -1 },
            { key: 'up', start: 12, end: 15, frameRate: 8, repeat: -1 },
            { key: 'down', start: 16, end: 19, frameRate: 8, repeat: -1 }
        ];

        anims.forEach(anim => {
            // For the 'turn' animation, use a single frame.
            if (anim.key === 'turn') {
                this.anims.create({
                    key: anim.key,
                    frames: [{ key: 'player', frame: anim.start }],
                    frameRate: anim.frameRate,
                    repeat: anim.repeat
                });
            } else {
                // For all other animations, generate the frame range.
                this.anims.create({
                    key: anim.key,
                    frames: this.anims.generateFrameNumbers('player', { start: anim.start, end: anim.end }),
                    frameRate: anim.frameRate,
                    repeat: anim.repeat
                });
            }
        });

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu'); 
    }
}
