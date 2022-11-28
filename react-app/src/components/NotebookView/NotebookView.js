import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./NotebookView.css";
import { TH_createNotebookPage, TH_getNotebookPages } from "../../store/page";
import DeleteNotebookView from "./DeleteNotebookView";
import EditNotebookView from "./EditNotebookView";

const NotebookView = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { notebookId } = useParams();

    const notebooks = useSelector(state => state.notebooks);
    const currentNotebook = notebooks[notebookId];
    const notebookPages = useSelector(state => state.pages.notebook);

    const [showDeleteView, setShowDeleteView] = useState(false);
    const [showEditView, setShowEditView] = useState(false);

    useEffect(() => {
        setShowDeleteView(false);
        setShowEditView(false);
    }, [currentNotebook]);

    useEffect(() => {
        (async () => {
            await dispatch(TH_getNotebookPages(notebookId));
        })();
    }, [dispatch, notebookId]);

    let notebookPageCount = Object.keys(notebookPages).length;

    const toggleDeleteView = () => {
        setShowEditView(false);
        setShowDeleteView(!showDeleteView);
    }

    const toggleEditView = () => {
        setShowDeleteView(false);
        setShowEditView(!showEditView);
    }

    const createPage = async () => {
        setShowEditView(false);
        setShowDeleteView(false);
        const newNotebookPage = await dispatch(TH_createNotebookPage(notebookId));
        history.push(`/notebooks/${notebookId}/pages/${newNotebookPage.id}`);
    }

    const selectPage = (pageId) => {
        history.push(`/notebooks/${notebookId}/pages/${pageId}`)
    }

    const formatDate = (dateString) => {
        const savedDate = new Date(dateString).toLocaleString();
        return savedDate;
    }

    return (
        <div id="notebookView-wrapper">

            <div id="notebook-details-wrapper">
                <div id="notebook-details-name">{currentNotebook?.name}</div>
                <div id="notebook-options">
                    <div id="notebook-page-count">{notebookPageCount} {notebookPageCount === 1 ? "page" : "pages"}</div>
                    <div id="note-book-actions-container">
                        <i onClick={createPage} className="fa-solid fa-file-circle-plus clickable green" title="Add a page"></i>
                        <i onClick={toggleDeleteView} className="fa-solid fa-trash-can clickable red" title="Delete notebook"></i>
                        <i onClick={toggleEditView} className="fa-solid fa-pencil clickable blue" title="Edit notebook"></i>
                    </div>
                </div>
            </div>

            {!showDeleteView && !showEditView && (
                <div id="notebook-pages-list">
                    {Object.keys(notebookPages).map(pageId => (
                        <div className="clickable dropdown-page hover-lgrey" onClick={() => selectPage(pageId)} key={pageId}>
                            <div className="notebook-page-title">{notebookPages[pageId].title}</div>
                            <div className="notebook-page-card-date">Last edit {formatDate(notebookPages[pageId].updatedAt)}</div>
                        </div>
                    ))}
                </div>
            )}

            {showDeleteView && (
                <DeleteNotebookView currentNotebook={currentNotebook} />
            )}

            {showEditView && (
                <EditNotebookView currentNotebook={currentNotebook} setShowEditView={setShowEditView} />
            )}

        </div>
    )
}

export default NotebookView;
