/// <reference path="../framework/GameItem.ts"/>

abstract class Block extends GameItem {

    private _currentPossitions: Vector[] = [];
    private _orientation: Orientation = Orientation.UP;

    constructor(image: HTMLImageElement) {
        super(image, null, null, 0, 0);
    }

    public get currentPositions(): Vector[] {
        return this._currentPossitions;
    }

    public set currentPositions(newPositions: Vector[]) {
        this._currentPossitions = newPositions;
    }

    public abstract get initialSquares(): boolean[][];

    public abstract prepareRotate(): boolean[][];

    public rotate() {
        this._orientation = this.nextOrientation();
        let newAngleDegrees = 0;
        switch(this._orientation) {
            case Orientation.UP:
                newAngleDegrees = 0;
                break;
            case Orientation.RIGHT:
                newAngleDegrees = 90;
                break;
            case Orientation.DOWN:
                newAngleDegrees = 180;
                break;
            case Orientation.LEFT:
                newAngleDegrees = 270;
                break;
        }
        this._angle = newAngleDegrees * (Math.PI / 180);
    }
    
    public updatePosition(newTopLeft: Vector) {        
        this._position = new Vector(newTopLeft.x + this._image.width / 2, newTopLeft.y + this._image.height / 2);        
    }

    protected nextOrientation(): Orientation {
        switch(this._orientation) {
            case Orientation.UP:
                return Orientation.RIGHT;
            case Orientation.RIGHT:
                return Orientation.DOWN;
            case Orientation.DOWN:
                return Orientation.LEFT;
            case Orientation.LEFT:
                return Orientation.UP;
        }
    }
}