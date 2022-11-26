import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./PageView.css";

const PageView = () => {
    // const dispatch = useDispatch();
    const { pageId } = useParams();

    const notebookPages = useSelector(state => state.pages.notebook);
    const currentPage = notebookPages[pageId];

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        setTitle(currentPage?.title || "");
        setContent(currentPage?.content || "");
    }, [currentPage]);

    const savedDate = new Date(currentPage?.updatedAt).toLocaleString();

    return (
        <div id="page-view-wrapper">

            <div id="page-view-header">
                <input
                id="page-edit-title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <div id="save-page-container">
                    <div>Save</div>
                    <div id="page-save-date">Last save {savedDate}</div>
                </div>
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
