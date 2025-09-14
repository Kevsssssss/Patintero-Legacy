import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');
        
        this.add.text(512, 280, 'PATINTERO', {
            fontFamily: '"Press Start 2P"', fontSize: 100, color: '#f3a51d',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5)
        this.add.text(512, 370, 'LEGACY', {
            fontFamily: '"Press Start 2P"', fontSize: 80, color: '#1977bd',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5)

        this.add.text(512, 600, 'Main Menu', {
            fontFamily: '"Press Start 2P"', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
