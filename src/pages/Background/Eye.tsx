import React from "react";
import { getDimensions, getMousePosition } from "../../utils";

function Eye () {
    const coordinates = getMousePosition();
    const dimensions = getDimensions();
    const [pupilPosition, setPupilPosition] = React.useState({ x: "0%", y: "0%" });

    React.useEffect(() => {
        setPupilPosition({
            x: `${(coordinates.x / dimensions.x) * 100}%`,
            y: `${(coordinates.y / dimensions.y) * 100}%`,
        });
    }, [coordinates, dimensions]);

    return (
        <div className="relative w-[15vw] h-[22.5vw] bg-white rounded-[100%]">
            <div className="absolute w-[5vw] h-[5vw] bg-black rounded-full" style={{
                left: pupilPosition.x,
                top: pupilPosition.y,
                transform: `translate(-${pupilPosition.x}, -${pupilPosition.y})`,
            }}/>
        </div>
    );
}

export default Eye;
