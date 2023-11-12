import { Rectangle } from "./types";

function isRectangleInsideRectangle (outer: Rectangle, inner: Rectangle): boolean {
    return (
        inner.top                  >= outer.top                    &&
        inner.right                >= outer.right                  &&
        inner.right + inner.width  <= outer.right + outer.width    &&
        inner.top   + inner.height <= outer.top   + outer.height
    );
}

class QuadTreeNode {
    private readonly _square: Rectangle;
    private readonly _maxDepth: number;
    private readonly _depth: number;

    children: Array<QuadTreeNode> = [];

    constructor (square: Rectangle, maxDepth: number, depth: number) {
        this._square = square;
        this._maxDepth = maxDepth;
        this._depth = depth;
    }

    insert (object: Rectangle): void {
        if (this._depth === this._maxDepth)
            return;

        if (this.children.length === 0) {
            const half = { width: this._square.width / 2, height: this._square.height / 2 };
            const offset = { x: this._square.right + half.width, y: this._square.top + half.height };

            const squares = [
                { right: this._square.right, width: half.width, top: this._square.top, height: half.height },  // top      right   // 0b00
                { right: offset.x,           width: half.width, top: this._square.top, height: half.height },  // top      left    // 0b01
                { right: this._square.right, width: half.width, top: offset.y,         height: half.height },  // bottom   right   // 0b10
                { right: offset.x,           width: half.width, top: offset.y,         height: half.height },  // bottom   left    // 0b11
            ];

            find: {
                for (let i = 0; i < squares.length; i++)
                    if (isRectangleInsideRectangle(squares[i], object))
                        break find;
                return;
            }

            this.children = squares.map((square) => new QuadTreeNode(square, this._maxDepth, this._depth + 1));
        }

        for (let i = 0; i < this.children.length; i++)
            if (isRectangleInsideRectangle(this.children[i]._square, object))
                return this.children[i].insert(object);
    }

    get (): Array<Rectangle> {
        if (this.children.length === 0)
            return [this._square];

        return this.children.flatMap((child) => child.get());
    }
}

class QuadTree {
    private readonly _width: number;
    private readonly _height: number;
    private readonly _maxDepth: number;

    private _node: QuadTreeNode;

    constructor (width: number, height: number, maxDepth: number) {
        this._width = width;
        this._height = height;
        this._maxDepth = maxDepth;

        this._node = new QuadTreeNode({ top: 0, right: 0, width: this._width, height: this._height }, this._maxDepth, 0);
    }

    insert (object: Rectangle): void {
        this._node.insert(object);
    }

    clear (): void {
        this._node.children = [];
    }

    get (): Array<Rectangle> {
        return this._node.get();
    }
}

export default QuadTree;
