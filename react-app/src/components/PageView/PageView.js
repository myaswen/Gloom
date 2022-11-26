import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./PageView.css";

const PageView = () => {
    const { pageId } = useParams();

    const notebookPages = useSelector(state => state.pages.notebook);
    const currentPage = notebookPages[pageId];

    return (
        <div id="page-view-wrapper">
            Page id: {pageId}
            Notebook id: {currentPage?.notebookId}
        </div>
    )
}

export default PageView;
