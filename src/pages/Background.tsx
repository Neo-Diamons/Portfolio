import React from "react";
import getMousePosition from "../utils/getMousePosition";

function Background() {
    const coords = getMousePosition();

    return (
        <div className="block bg-gray-950 min-w-screen min-h-screen">
            <p
                className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 hover:cursor-none"
                style={{
                    left: coords.x,
                    top: coords.y,
                }}
            >
                ({coords.x}, {coords.y})
            </p>
        </div>
    );
}

export default Background;
