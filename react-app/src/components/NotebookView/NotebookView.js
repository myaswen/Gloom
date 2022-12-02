import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";

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
                        <i onClick={createPage} className="fa-solid fa-file-circle-plus clickable icon-button button-sink" title="Add a page"></i>
                        <i onClick={toggleDeleteView} className="fa-solid fa-trash-can clickable icon-button button-sink" title="Delete notebook"></i>
                        <i onClick={toggleEditView} className="fa-solid fa-pencil clickable icon-button button-sink" title="Edit notebook"></i>
                    </div>
                </div>
            </div>

            {!showDeleteView && !showEditView && (
                <div id="notebook-pages-list">
                    {Object.keys(notebookPages).map(pageId => (
                        <NavLink activeClassName="active-page-link" className="clickable dropdown-page hover-lgrey" to={`/notebooks/${notebookId}/pages/${pageId}`} key={pageId}>
                            <div className="notebook-page-title">{notebookPages[pageId].title}</div>
                            <div className="notebook-page-card-date">Last edit {formatDate(notebookPages[pageId].updatedAt)}</div>
                        </NavLink>
                    ))}
                </div>
            )}

            {showDeleteView && (
                <DeleteNotebookView currentNotebook={currentNotebook} setShowDeleteView={setShowDeleteView} />
            )}

            {showEditView && (
                <EditNotebookView currentNotebook={currentNotebook} setShowEditView={setShowEditView} />
            )}

        </div>
    )
}

export default NotebookView;
