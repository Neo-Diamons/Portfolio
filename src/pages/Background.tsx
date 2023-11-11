import React from "react";
import getMousePosition from "../utils/getMousePosition";

function Background() {
    const coords = getMousePosition();

    return (
        <div className="group block bg-gray-950 min-w-screen min-h-screen hover:cursor-none">
            <p
                className="
                    absolute text-white transform -translate-x-1/2 -translate-y-1/2
                    group-hover:block hidden whitespace-nowrap select-none
                "
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
