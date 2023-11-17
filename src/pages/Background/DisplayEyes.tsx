import React from "react";
// import { Eye } from "./";
import Eye from "./Eye";

function DisplayEyes ( ) {
    return (
        <div className="
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            flex flex-row justify-center items-center gap-[10vw]
        ">
            <div className="">
                <Eye />
            </div>
            <div>
                <Eye />
            </div>
        </div>
    );
}

export default DisplayEyes;
