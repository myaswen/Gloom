import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TH_getScratchpad } from "../../store/scratchpad";

import "./Scratchpad.css";

const Scratchpad = () => {
    const dispatch = useDispatch();

    const scratchpad = useSelector(state => state.scratchpad);

    const [errors, setErrors] = useState({});
    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(scratchpad.content);
    }, [scratchpad]);

    useEffect(() => {
        dispatch(TH_getScratchpad());
    }, [dispatch]);

    const savedDate = new Date(scratchpad?.updatedAt).toLocaleString();

    console.log("CURRENT SCRATCHPAD: ", scratchpad);
    return (
        <div id="scratchpad-container">
            <div id="scratchpad-options-wrapper">

                <div>SCRATCH PAD</div>

                <div id="save-scratchpad-container">
                    <div>Save</div>
                    <div id="scratchpad-save-date">Last save {savedDate}</div>
                </div>

            </div>
            <div id="scratchpad-input-container">
                <textarea
                    id="scratchpad-edit-content-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Scratchpad;
