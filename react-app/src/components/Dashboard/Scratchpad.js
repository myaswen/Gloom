import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TH_editScratchpad, TH_getScratchpad } from "../../store/scratchpad";

import "./Scratchpad.css";

const Scratchpad = () => {
    const history = useHistory();
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

    const editScratchpad = async () => {
        const editData = {
            content
        };

        const response = await dispatch(TH_editScratchpad(scratchpad.id, editData));
        if (response.errors) {
            setErrors(response.errors);
        } else {
            history.push(`/dashboard`);
        }
    }

    const savedDate = new Date(scratchpad?.updatedAt).toLocaleString();

    return (
        <div id="scratchpad-container">

            <div id="scratchpad-options-wrapper">

                <div id="scratchpad-options">
                    <div>SCRATCH PAD</div>
                    <div id="save-scratchpad-container">
                        <div onClick={editScratchpad} id="scratchpad-save-button" className="clickable">Save</div>
                        <div id="scratchpad-save-date">Last save {savedDate}</div>
                    </div>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div id="edit-scratchpad-popup-container">
                        {errors.content && (
                            <p>Content error: {errors.content[0]}</p>
                        )}
                        <div onClick={() => setErrors({})} className="clickable">Close</div>
                    </div>
                )}

            </div>

            <div id="scratchpad-input-container">
                <textarea
                    id="scratchpad-edit-content-input"
                    placeholder="A place for quick thoughts..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Scratchpad;
