import React from "react";
import { useState } from "react";

import "./EditNotebookView.css";

const EditNotebookView = ({ currentNotebook }) => {
    const [name, setName] = useState(currentNotebook.name);
    const [errors, setErrors] = useState([]);

    const editNotebook = async () => {
        const editData = { name }
        console.log("Edit Data: ", editData);
    }

    return (
        <div id="edit-notebook-wrapper">
            <div>Notebook name:</div>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            {errors.length > 0 && (
                <div>{errors[0]}</div>
            )}
            <div onClick={editNotebook} className="clickable">Submit</div>
        </div>
    )
}

export default EditNotebookView;
