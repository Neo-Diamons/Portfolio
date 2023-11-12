import React, { useState, useEffect }  from "react";
import { getDimensions, QuadTree } from "../../utils";
import { Rectangle, Vector2 } from "../../utils/types";

function DisplayQuadtree ( { coords, squares }: { coords: Vector2, squares: Array<Rectangle> } ) {
    const [ array, setArray ] = useState<Array<Rectangle>>([]);
    const dimensions = getDimensions();

    useEffect(() => {
        setArray(() => {
            const quadTree = new QuadTree(dimensions.x, dimensions.y, 6);
            squares.forEach((object) => quadTree.insert(object));
            return quadTree.get();
        });
    }, [coords, dimensions, squares]);

    return (
        <svg viewBox={"0 0 " + dimensions.x + " " + dimensions.y} xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-glow"
        >
            {array.map((quad, index) => (
                <rect
                    key={index}
                    x={quad.right}
                    y={quad.top}
                    width={quad.width}
                    height={quad.height}
                    fill="transparent"
                    stroke="white"
                    strokeWidth="1"
                />
            ))}
        </svg>
    );
}

export default DisplayQuadtree;
