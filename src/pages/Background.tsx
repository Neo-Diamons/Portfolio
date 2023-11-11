import React, { useEffect }  from "react";
import getMousePosition from "../utils/getMousePosition";
import getQuadTree from "../utils/getQuadTree";

function Background() {
    const coords = getMousePosition();
    const [quadTree, setQuadTree] = React.useState<Array<{right: number, width: number, top: number, height: number}>>([]);

    useEffect(() => {
        setQuadTree(getQuadTree(
            {right: 0, width: window.innerWidth, top: 0, height: window.innerHeight},
            6,
            0,
            coords
        ));
    }, [coords]);

    return (
        <div className="
            group min-w-screen min-h-screen hover:cursor-none bg-gradient-radial from-gray-950 via-gray-950 bg-black
        ">
            <div className="hidden group-hover:block min-w-screen min-h-screen">
                <div
                    className="absolute w-4 h-4 text-center bg-white rounded-full blur-sm"
                    style={{ left: coords.x - 8, top: coords.y - 8 }}
                />

                <div
                    className="
                        absolute text-white transform -translate-x-1/2 -translate-y-1/2
                        bg-gray-900 bg-opacity-75 rounded-md px-2 py-1
                        whitespace-nowrap select-none
                    "
                    style={{ left: window.innerWidth / 2, top: 25, }}
                >
                    <h1>({coords.x}, {coords.y})</h1>
                </div>

                <svg viewBox={"0 0 " + window.innerWidth + " " + window.innerHeight} xmlns="http://www.w3.org/2000/svg">
                    {quadTree.map((quad, index) => (
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
            </div>
        </div>
    );
}

export default Background;
