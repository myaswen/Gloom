import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TH_getScratchpad } from "../../store/scratchpad";

import "./Scratchpad.css";

const Scratchpad = () => {
    const dispatch = useDispatch();

    const scratchpad = useSelector(state => state.scratchpad);

    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(scratchpad.content);
    }, [scratchpad]);

    useEffect(() => {
        dispatch(TH_getScratchpad());
    }, [dispatch]);

    console.log("CURRENT SCRATCHPAD: ", scratchpad);
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
