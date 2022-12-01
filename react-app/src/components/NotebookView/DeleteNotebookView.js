import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { TH_deleteNotebook } from "../../store/notebook";

import "./DeleteNotebookView.css";

const DeleteNotebookView = ({ currentNotebook, setShowDeleteView }) => {
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
            <p>Are you sure you want to delete this notebook? All of its pages will be lost.</p>
            <p className="delete-notebook-warning">This action is permanent.</p>
            <p>Enter "<span className="delete-notebook-warning">{currentNotebook?.name}</span>" to confirm:</p>
            <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
            />
            {errors.length > 0 && (
                <div id="delete-notebook-error">{errors[0]}</div>
            )}
            <div id="delete-notebook-buttons-container">
                <div onClick={deleteNotebook} className="clickable button-sink" id="delete-notebook-submit-button">Delete</div>
                <div onClick={() => setShowDeleteView(false)} className="clickable button-sink" id="delete-notebook-cancel-button">Cancel</div>
            </div>
        </div>
    )
}

export default DeleteNotebookView;
