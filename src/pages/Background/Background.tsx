import React from "react";
import getMousePosition from "../../utils/getMousePosition";
import DisplayQuadtree from "./DisplayQuadtree";

function Background() {
    const coords = getMousePosition();

    return (
        <div className="
            group min-w-screen min-h-screen hover:cursor-none bg-gradient-radial from-gray-950 via-gray-950 bg-black
        ">
            <div className="hidden group-hover:block min-w-screen min-h-screen">
                <div
                    className="absolute w-4 h-4 text-center bg-white rounded-full drop-shadow-glow blur-[2.5px]"
                    style={{ left: coords.x - 8, top: coords.y - 8 }}
                />

                <div
                    className="
                        absolute text-white transform -translate-x-1/2 -translate-y-1/2
                        bg-gray-900 bg-opacity-75 rounded-md px-2 py-1
                        whitespace-nowrap select-none font-bold
                    "
                    style={{ left: window.innerWidth / 2, top: 25, }}
                >
                    <h1>({coords.x}, {coords.y})</h1>
                </div>

                <DisplayQuadtree coords={coords} />
            </div>
        </div>
    );
}

export default Background;
