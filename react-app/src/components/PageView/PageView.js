import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { TH_deletePage, TH_editPage } from "../../store/page";

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

    const savedDate = new Date(currentPage?.updatedAt).toLocaleString();

    return (
        <div id="page-view-wrapper">

            <div id="page-view-header">

                <div id="page-header-options-container">
                    <div id="page-header-options-left">
                        <input
                            id="page-edit-title-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <i onClick={toggleDeleteView} className="fa-solid fa-file-circle-minus clickable" title="Delete page"></i>
                    </div>
                    <div id="save-page-container">
                        <div onClick={editPage} className="clickable">Save</div>
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
                        <div>Are you sure you want to delete this page?</div>
                        <div onClick={deletePage} className="clickable">Confirm</div>
                        <div onClick={() => setShowDeleteView(false)} className="clickable">Cancel</div>
                    </div>
                )}

            </div>

            <div id="page-view-body">
                <textarea
                    id="page-edit-content-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div id="page-view-footer">
                Page view footer placeholder
            </div>

        </div>
    )
}

export default PageView;
