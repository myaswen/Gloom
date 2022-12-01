import React from "react";
import { useHistory } from "react-router-dom";

const BookmarkedPages = ({ userPages, formatDate }) => {
    const history = useHistory();

    const pageIds = Object.keys(userPages);
    const bookmarkedPageIds = pageIds.filter((pageId) => userPages[pageId].bookmarked === true);

    const selectPage = (pageId) => {
        history.push(`/notebooks/${userPages[pageId].notebookId}/pages/${pageId}`);
    }

    return (
        <div className="dashboard-comp-wrapper">

            <div className="dashboard-comp-header">
                <div>Bookmarked</div>
            </div>

            <div className="dashboard-comp-page-card-wrapper">
                {bookmarkedPageIds.map(pageId => (
                    <div className="dashboard-comp-page-card clickable" key={pageId} onClick={() => selectPage(pageId)}>
                        <div className="dashboard-page-card-title">{userPages[pageId].title}</div>
                        <div className="dashboard-page-card-date">{formatDate(userPages[pageId].updatedAt)}</div>
                    </div>
                ))}
                {bookmarkedPageIds.length === 0 && (
                    <div className="dashboard-comp-page-card">
                        <div className="no-pages-card">
                            <p>All of your bookmarked pages will show up here!</p>
                            <p>You can bookmark a page with the bookmark icon on the left of the edit menu when you view a page.</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default BookmarkedPages;
