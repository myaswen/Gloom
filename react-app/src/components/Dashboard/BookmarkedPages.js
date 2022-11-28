import React from "react";
import { useHistory } from "react-router-dom";

import "./BookmarkedPages.css";

const BookmarkedPages = ({ userPages }) => {
    const history = useHistory();

    const pageIds = Object.keys(userPages);
    const bookmarkedPageIds = pageIds.filter((pageId) => userPages[pageId].bookmarked === true);

    const selectPage = (pageId) => {
        history.push(`/notebooks/${userPages[pageId].notebookId}/pages/${pageId}`);
    }

    return (
        <div id="bookmarked-pages-wrapper">

            <div id="bookmarked-pages-header">
                <div>Bookmarked</div>
            </div>

            <div id="bookmarked-pages-cards-wrapper">
                {bookmarkedPageIds.map(pageId => (
                    <div className="bookmarked-page-card clickable" key={pageId} onClick={() => selectPage(pageId)}>
                        <div>{userPages[pageId].title}</div>
                        <div>{userPages[pageId].updatedAt}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default BookmarkedPages;
