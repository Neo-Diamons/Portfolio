import React, { useEffect } from "react";
import { randint, Flake } from "../../utils";
import { Vector2 } from "../../utils/types";
import { DisplayQuadtree } from "./";

function DisplaySnow ( { coords }: { coords: Vector2 } ) {
    const [ snow, setSnow ] = React.useState<Array<Flake>>([]);
    const [ delay, setDelay ] = React.useState(0);
    const [ count, setCount ] = React.useState(0);

    useEffect(() => {
        const snowInterval = setInterval(() => {
            setSnow((prev) => {
                const newSnow = [ ...prev ];
                setCount((prev) => prev + 1);

                newSnow.forEach((flake, index) => {
                    if (flake.update(window.innerHeight))
                        newSnow.splice(index, 1);
                });

                if (newSnow.length < 100 && count > delay) {
                    setCount(0);
                    setDelay(randint(10, 25));
                    newSnow.push(new Flake(Math.random() * window.innerWidth, -10, 1));
                }

                return newSnow;
            });
        }, 10);

        return () => {
            clearInterval(snowInterval);
        };
    }, [delay, count]);

    return (
        <div>
            {snow.map((flake, index) => (
                <div
                    key={index}
                    className="absolute w-4 h-4 text-center bg-white rounded-full drop-shadow-glow blur-[2.5px]"
                    style={{ left: flake.pos.x, top: flake.pos.y }}
                />
            ))}

            <DisplayQuadtree coords={coords} squares={snow.map((flake) => {
                return { top: flake.pos.y, right: flake.pos.x, width: 16, height: 16 };
            })} />
        </div>
    );
}

export default DisplaySnow;
