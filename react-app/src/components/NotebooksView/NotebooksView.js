import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { TH_getNotebookPages } from "../../../store/page";
import { TH_getNotebookPages } from "../../store/page";
import "./NotebooksView.css";
import DeleteNotebookView from "./DeleteNotebookView";

const NotebooksView = () => {
    const dispatch = useDispatch();
    const currentNotebook = useSelector(state => state.notebooks.current);
    const notebookPages = useSelector(state => state.pages.notebook);
    const [loaded, setLoaded] = useState(false);
    const [showDeleteView, setShowDeleteView] = useState(false);

    useEffect(() => {
        setShowDeleteView(false);
    }, [currentNotebook]);

    useEffect(() => {
        (async () => {
            await dispatch(TH_getNotebookPages(currentNotebook.id));
            setLoaded(true);
        })();
    }, [dispatch, currentNotebook]);

    if (!loaded) return null;

    let notebookPageCount = Object.keys(notebookPages).length;

    return (
        <div id="notebooksView-wrapper">

            <div id="notebook-details-wrapper">
                <div>{currentNotebook.name}</div>
                <div id="notebook-options">
                    <div>{notebookPageCount} {notebookPageCount === 1 ? "page" : "pages"}</div>
                    <div id="note-book-actions-container">
                        <i className="fa-solid fa-file-circle-plus clickable" title="Add a page"></i>
                        <i onClick={() => setShowDeleteView(true)} className="fa-solid fa-trash-can clickable" title="Delete notebook"></i>
                        <i className="fa-solid fa-wrench clickable" title="Edit notebook"></i>
                    </div>
                </div>
            </div>

            {!showDeleteView && (
                <div id="notebook-pages-list">
                    {Object.keys(notebookPages).map(pageId => (
                        <div key={pageId}>{notebookPages[pageId].title}</div>
                    ))}
                </div>
            )}

            {showDeleteView && (
                <DeleteNotebookView currentNotebook={currentNotebook} />
            )}

        </div>
    )
}

export default NotebooksView;
