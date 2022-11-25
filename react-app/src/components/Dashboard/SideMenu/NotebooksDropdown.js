import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TH_getNotebooks } from "../../../store/notebook";
import { TH_getNotebookPages } from "../../../store/page";
import "./NotebooksDropdown.css";

const NotebooksDropdown = ({ setViewSelection }) => {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebooks);
    const [loaded, setLoaded] = useState(false);
    const [showNotebooks, setShowNotebooks] = useState(false);

    useEffect(() => {
        (async() => {
            await dispatch(TH_getNotebooks());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) return null;

    const selectNotebook = async (notebookId) => {
        await dispatch(TH_getNotebookPages(notebookId));
        setViewSelection("notebooks");
    }

    return (
        <div id="notebooks-dropdown-wrapper">
            <div onClick={() => setShowNotebooks(!showNotebooks)}>Notebooks</div>
            {showNotebooks && (
                <div id="notebooks-dropdown-list">
                    {Object.keys(notebooks).map(notebookId => (
                        <div onClick={() => selectNotebook(notebookId)} key={notebookId}>{notebooks[notebookId].name}</div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NotebooksDropdown;
