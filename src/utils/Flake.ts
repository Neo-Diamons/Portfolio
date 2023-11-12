import { Vector2 } from "./types";

class Flake {
    private readonly _pos: Vector2;
    private readonly _speed: number;

    constructor(x: number, y: number, speed: number) {
        this._pos = { x, y };
        this._speed = speed;
    }

    update (maxY: number): boolean {
        this._pos.y += this._speed;
        return this._pos.y > maxY;
    }

    get pos(): Vector2 {
        return this._pos;
    }
}

export default Flake;
