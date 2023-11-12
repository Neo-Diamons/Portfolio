import { useEffect, useState } from "react";
import { Vector2 } from "./types";

function getDimensions () {
    const [dimensions, setDimensions] = useState<Vector2>({ x: window.innerWidth, y: window.innerHeight });

    useEffect(() => {
        function handleResize () {
            setDimensions({
                x: window.innerWidth,
                y: window.innerHeight
            });
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener(
                "resize",
                handleResize,
            );
        };
    }, []);

    return dimensions;
}

export default getDimensions;
