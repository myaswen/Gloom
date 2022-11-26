import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./NotebookView.css";
import { TH_getNotebookPages } from "../../store/page";
import DeleteNotebookView from "./DeleteNotebookView";
import { useParams } from "react-router-dom";

const NotebookView = () => {
    const dispatch = useDispatch();
    const { notebookId } = useParams();

    const notebooks = useSelector(state => state.notebooks);
    const currentNotebook = notebooks[notebookId];
    const notebookPages = useSelector(state => state.pages.notebook);

    const [showDeleteView, setShowDeleteView] = useState(false);

    useEffect(() => {
        setShowDeleteView(false);
    }, [currentNotebook]);

    useEffect(() => {
        (async () => {
            await dispatch(TH_getNotebookPages(notebookId));
        })();
    }, [dispatch, notebookId]);

    let notebookPageCount = Object.keys(notebookPages).length;

    return (
        <div id="notebookView-wrapper">

            <div id="notebook-details-wrapper">
                <div>{currentNotebook?.name}</div>
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

export default NotebookView;