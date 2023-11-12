import { useEffect, useState } from "react";
import { Vector2 } from "./types";

function getMousePosition () {
    const [coords, setCoords] = useState<Vector2>({ x: 0, y: 0 });

    useEffect(() => {
        function handleWindowMouseMove (event: MouseEvent) {
            setCoords({
                x: event.clientX,
                y: event.clientY
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
