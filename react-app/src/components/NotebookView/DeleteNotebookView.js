import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { TH_deleteNotebook } from "../../store/notebook";

import "./DeleteNotebookView.css";

const DeleteNotebookView = ({ currentNotebook }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [confirmationText, setConfirmationText] = useState("");
    const [errors, setErrors] = useState([]);

    const deleteNotebook = async () => {
        if (confirmationText === currentNotebook?.name) {
            await dispatch(TH_deleteNotebook(currentNotebook.id));
            history.push("/dashboard");
        } else {
            setErrors(["Confirmation does not match"]);
        }
    }

    return (
        <div id="delete-notebook-view-wrapper">
            <div>Are you sure you want to delete the following notebook: {currentNotebook?.name}?</div>
            <div>Please enter "{currentNotebook?.name}" to confirm:</div>
            <input
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            />
            {errors.length > 0 && (
                <div>{errors[0]}</div>
            )}
            <div onClick={deleteNotebook} className="clickable">Delete Notebook</div>
        </div>
    )
}

export default DeleteNotebookView;
