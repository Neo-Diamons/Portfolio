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
    square: Rectangle;
    maxDepth: number;
    depth: number;

    children: Array<QuadTreeNode> = [];

    constructor (square: Rectangle, maxDepth: number, depth: number) {
        this.square = square;
        this.maxDepth = maxDepth;
        this.depth = depth;
    }

    insert (object: Rectangle): void {
        if (!isRectangleInsideRectangle(this.square, object) || this.depth === this.maxDepth)
            return;

        if (this.children.length === 0) {
            const half = { width: this.square.width / 2, height: this.square.height / 2 };
            const offset = { x: this.square.right + half.width, y: this.square.top + half.height };

            const squares = [
                { right: this.square.right, width: half.width, top: this.square.top, height: half.height },  // top      right   // 0b00
                { right: offset.x,          width: half.width, top: this.square.top, height: half.height },  // top      left    // 0b01
                { right: this.square.right, width: half.width, top: offset.y,        height: half.height },  // bottom   right   // 0b10
                { right: offset.x,          width: half.width, top: offset.y,        height: half.height },  // bottom   left    // 0b11
            ];

            this.children = squares.map((square) => new QuadTreeNode(square, this.maxDepth, this.depth + 1));
        }

        for (let i = 0; i < 4; i++)
            if (isRectangleInsideRectangle(this.children[i].square, object))
                return this.children[i].insert(object);
    }

    get (): Array<Rectangle> {
        if (this.children.length === 0)
            return [this.square];

        return this.children.flatMap((child) => child.get());
    }
}

class QuadTree {
    width: number;
    height: number;
    maxDepth: number;

    node: QuadTreeNode;

    constructor (width: number, height: number, maxDepth: number) {
        this.width = width;
        this.height = height;
        this.maxDepth = maxDepth;

        this.node = new QuadTreeNode({ top: 0, right: 0, width: this.width, height: this.height }, this.maxDepth, 0);
    }

    resize (width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    insert (object: Rectangle): void {
        this.node.insert(object);
    }

    clear (): void {
        this.node.children = [];
    }

    get (): Array<Rectangle> {
        return this.node.get();
    }
}

export default QuadTree;
