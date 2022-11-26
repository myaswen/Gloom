import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TH_editNotebook } from "../../store/notebook";

import "./EditNotebookView.css";

const EditNotebookView = ({ currentNotebook }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(currentNotebook.name);
    const [errors, setErrors] = useState({});

    const editNotebook = async () => {
        const editData = { name };

        const response = await dispatch(TH_editNotebook(currentNotebook.id, editData));
        if (response.errors) {
            setErrors(response.errors);
        } else {
            console.log("EDITED NOTEBOOK RETURNED: ", response);
        }
    }

    return (
        <div id="edit-notebook-wrapper">
            <div>Notebook name:</div>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
                <div>{errors.name[0]}</div>
            )}
            <div onClick={editNotebook} className="clickable">Submit</div>
        </div>
    )
}

export default EditNotebookView;
