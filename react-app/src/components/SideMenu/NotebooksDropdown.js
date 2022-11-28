import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./NotebooksDropdown.css";
import { TH_getNotebooks } from "../../store/notebook"
import { TH_createNotebook } from "../../store/notebook";

const NotebooksDropdown = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const notebooks = useSelector(state => state.notebooks);

    const [showNotebooks, setShowNotebooks] = useState(false);

    useEffect(() => {
        (async () => {
            await dispatch(TH_getNotebooks());
        })();
    }, [dispatch]);

    const selectNotebook = (notebookId) => {
        history.push(`/notebooks/${notebookId}`);
    }

    const createNewNotebook = async () => {
        const newNotebook = await dispatch(TH_createNotebook());
        history.push(`/notebooks/${newNotebook.id}`);
    }

    return (
        <div id="notebooks-dropdown-wrapper">

            <div onClick={() => setShowNotebooks(!showNotebooks)} className="clickable hover-lgrey" id="notebooks-dropdown-button">
                <i className="fa-solid fa-book"></i>
                <div>Notebooks</div>
            </div>

            {showNotebooks && (
                <div id="notebooks-dropdown-list">
                    {Object.keys(notebooks).map(notebookId => (
                        <div className="clickable dropdown-notebook hover-lgrey" onClick={() => selectNotebook(notebookId)} key={notebookId}>
                            <i className="fa-solid fa-book"></i>
                            <div>{notebooks[notebookId].name}</div>
                        </div>
                    ))}
                    <div id="create-notebook-button" className="clickable hover-lgrey" onClick={createNewNotebook}>
                        <i className="fa-solid fa-book-medical green"></i>
                        <div>New Notebook</div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default NotebooksDropdown;
