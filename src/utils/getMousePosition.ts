import { useEffect, useState } from "react";

function getMousePosition () {
    const [coords, setCoords] = useState({x: 0, y: 0});

    useEffect(() => {
        function handleWindowMouseMove (event: MouseEvent) {
            setCoords({
                x: event.clientX,
                y: event.clientY,
            });
        }
        window.addEventListener("mousemove", handleWindowMouseMove);

        return () => {
            window.removeEventListener(
                "mousemove",
                handleWindowMouseMove,
            );
        };
    }, []);

    return coords;
}

export default getMousePosition;
