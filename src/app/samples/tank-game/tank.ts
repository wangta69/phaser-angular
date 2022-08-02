export class TankObj {
    private name: string;
    private game: any;
    private tank: any;
    constructor(game: any, name: string) {
        this.name = name;
        this.game = game;
        console.log('TankObj >> ', name, game);

        this.tank = game.physics.add.image(0, 0, name).setOrigin(0, 0)
        // this.tank.alpha = 0.5;
    }

}