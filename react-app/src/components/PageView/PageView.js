import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./PageView.css";

const PageView = () => {
    const { pageId } = useParams();

    const notebookPages = useSelector(state => state.pages.notebook);
    const currentPage = notebookPages[pageId];

    const savedDate = new Date(currentPage?.updatedAt).toLocaleString();

    return (
        <div id="page-view-wrapper">
            <div id="page-view-header">
                <div>{currentPage?.title}</div>
                <div id="save-page-container">
                    <div>Last save {savedDate}</div>
                    <div>Save</div>
                </div>
            </div>
            <div id="page-view-body">
                {currentPage?.content}
            </div>
            <div id="page-view-footer">
                Page view footer placeholder
            </div>
        </div>
    )
}

export default PageView;
