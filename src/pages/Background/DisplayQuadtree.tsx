import React, { useState, useEffect }  from "react";
import { getDimensions, QuadTree } from "../../utils";
import { Rectangle, Vector2 } from "../../utils/types";

function DisplayQuadtree ( { coords }: { coords: Vector2 } ) {
    const [ array, setArray ] = useState<Array<Rectangle>>([]);
    const dimensions = getDimensions();

    useEffect(() => {
        setArray(() => {
            const quadTree = new QuadTree(dimensions.x, dimensions.y, 6);
            const x = Math.max(0, Math.min(dimensions.x, coords.x));
            const y = Math.max(0, Math.min(window.innerHeight, coords.y));

            quadTree.insert({ top: y, right: x, width: 1, height: 1 });
            return quadTree.get();
        });
    }, [coords, dimensions]);

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
