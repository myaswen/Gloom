import React from "react";

import "./Scratchpad.css";

const Scratchpad = () => {
    return (
        <div id="scratchpad-container">
            <div id="scratchpad-options-wrapper">

                <div>SCRATCH PAD</div>

                <div id="save-scratchpad-container">
                    <div>Save</div>
                    <div>Last save null</div>
                </div>

            </div>
            <div id="scratchpad-input-container">
                input placeholder
            </div>
        </div>
    );
}

export default Scratchpad;
