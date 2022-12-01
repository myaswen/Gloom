import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { TH_deletePage, TH_editPage } from "../../store/page";
import TextEditor from "../TextEditor/TextEditor";

import "./PageView.css";

const PageView = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { pageId, notebookId } = useParams();

    const notebookPages = useSelector(state => state.pages.notebook);
    const currentPage = notebookPages[pageId];

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [bookmarked, setBookmarked] = useState(false);
    const [errors, setErrors] = useState({});
    const [showDeleteView, setShowDeleteView] = useState(false);

    useEffect(() => {
        setTitle(currentPage?.title || "");
        setContent(currentPage?.content || "");
        setBookmarked(currentPage?.bookmarked || false)
        setErrors({});
        setShowDeleteView(false);
    }, [currentPage]);

    const editPage = async () => {
        const editData = {
            title,
            content,
            bookmarked
        }

        const response = await dispatch(TH_editPage(currentPage.id, editData));
        if (response.errors) {
            setShowDeleteView(false);
            setErrors(response.errors);
        } else {
            console.log("EDITED PAGE RETURNED: ", response);
            history.push(`/notebooks/${response.notebookId}/pages/${response.id}`);
        }
    }

    const deletePage = async () => {
        await dispatch(TH_deletePage(pageId));
        history.push(`/notebooks/${notebookId}`);
    }

    const toggleDeleteView = () => {
        setErrors({});
        setShowDeleteView(true);
    }

    const toggleBookmarkTrue = async () => {
        const editData = {
            title,
            content,
            bookmarked: true
        }

        const response = await dispatch(TH_editPage(currentPage.id, editData));
        if (response.errors) {
            setShowDeleteView(false);
            setErrors(response.errors);
        } else {
            history.push(`/notebooks/${response.notebookId}/pages/${response.id}`);
        }
    }

    const toggleBookmarkFalse = async () => {
        const editData = {
            title,
            content,
            bookmarked: false
        }

        const response = await dispatch(TH_editPage(currentPage.id, editData));
        if (response.errors) {
            setShowDeleteView(false);
            setErrors(response.errors);
        } else {
            history.push(`/notebooks/${response.notebookId}/pages/${response.id}`);
        }
    }

    const savedDate = new Date(currentPage?.updatedAt).toLocaleString();

    return (
        <div id="page-view-wrapper">

            <div id="page-view-header">

                <div id="page-header-options-container">
                    <div id="page-header-options-left">
                        <input
                            id="page-edit-title-input"
                            type="text"
                            placeholder="Give your page a title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <div id="page-options-container">
                            {!bookmarked && (<i onClick={toggleBookmarkTrue} className="fa-regular fa-bookmark clickable icon-button button-sink" title="Add bookmark"></i>)}
                            {bookmarked && (<i onClick={toggleBookmarkFalse} className="fa-solid fa-bookmark clickable icon-button button-sink" title="Remove bookmark"></i>)}
                            <i onClick={toggleDeleteView} className="fa-solid fa-file-circle-minus clickable icon-button button-sink" title="Delete page"></i>
                        </div>
                    </div>
                    <div id="save-page-container">
                        <div onClick={editPage} className="clickable button-sink" id="page-save-button">Save</div>
                        <div id="page-save-date">Last save {savedDate}</div>
                    </div>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div id="edit-page-popup-container">
                        {errors.title && (
                            <p>Title error: {errors.title[0]}</p>
                        )}
                        {errors.content && (
                            <p>Content error: {errors.content[0]}</p>
                        )}

                        <div onClick={() => setErrors({})} className="clickable">Close</div>
                    </div>
                )}

                {showDeleteView && (
                    <div id="edit-page-popup-container">
                        <p>Are you sure you want to delete this page?</p>
                        <div id="delete-page-button-container">
                            <div onClick={deletePage} className="clickable button-sink" id="delete-page-submit-button">Delete</div>
                            <div onClick={() => setShowDeleteView(false)} className="clickable button-sink" id="delete-page-cancel-button">Cancel</div>
                        </div>
                    </div>
                )}

            </div>

            <div id="page-view-body">
                {/* <textarea
                    id="page-edit-content-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                /> */}
                <TextEditor content={content} setContent={setContent} />
            </div>

            <div id="page-view-footer">

            </div>

        </div>
    )
}

export default PageView;
