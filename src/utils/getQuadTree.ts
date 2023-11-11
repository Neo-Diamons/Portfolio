type Square = {
    top: number,
    right: number,
    width: number,
    height: number
};

function getQuadTree (
    square: Square,
    maxDepth: number,
    depth: number,
    coordinates: { x: number, y: number }
) : Array<Square> {

    // Exit condition
    if (depth === maxDepth)
        return [];

    const half = { width: square.width / 2, height: square.height / 2 };
    const offset = { x: square.right + half.width, y: square.top + half.height };
    
    const squares = [
        { right: square.right,  width: half.width, top: square.top, height: half.height },  // top      right   // 0b00
        { right: offset.x,      width: half.width, top: square.top, height: half.height },  // top      left    // 0b01
        { right: square.right,  width: half.width, top: offset.y,   height: half.height },  // bottom   right   // 0b10
        { right: offset.x,      width: half.width, top: offset.y,   height: half.height },  // bottom   left    // 0b11
    ];

    // Recursive calls
    const index =
          (coordinates.x < square.right + half.width  ? 0b00 : 0b01)
        | (coordinates.y < square.top   + half.height ? 0b00 : 0b10);

    return squares.concat(getQuadTree(squares[index], maxDepth, depth + 1, coordinates));
}

export default getQuadTree;
