import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TH_editNotebook } from "../../store/notebook";

import "./EditNotebookView.css";

const EditNotebookView = ({ currentNotebook, setShowEditView }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(currentNotebook.name);
    const [errors, setErrors] = useState({});

    const editNotebook = async () => {
        const editData = { name };

        const response = await dispatch(TH_editNotebook(currentNotebook.id, editData));
        if (response.errors) setErrors(response.errors);
    }

    return (
        <div id="edit-notebook-wrapper">
            {/* <div>Enter a new notebook name:</div> */}
            <div id="edit-notebook-input-container">
                <label>Notebook name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                    <div id="notebook-error">{errors.name[0]}</div>
                )}
            </div>
            <div id="edit-notebook-buttons-container">
                <div onClick={editNotebook} className="clickable" id="edit-notebook-submit-button">Submit</div>
                <div onClick={() => setShowEditView(false)} className="clickable" id="edit-notebook-cancel-button">Cancel</div>
            </div>
        </div>
    )
}

export default EditNotebookView;
