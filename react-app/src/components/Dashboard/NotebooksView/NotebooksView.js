import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TH_getNotebookPages } from "../../../store/page";
import "./NotebooksView.css";

const NotebooksView = () => {
    // const dispatch = useDispatch();
    const notebookPages = useSelector(state => state.pages.notebook)
    // const [loaded, setLoaded] = useState(false);

    // useEffect(() => {
    //     (async() => {
    //         await dispatch(TH_getNotebookPages());
    //         setLoaded(true);
    //     })();
    // }, [dispatch]);

    // if (!loaded) return null;

    console.log("NOTEBOOK PAGES FROM NOTEBOOKS VIEW: ", notebookPages);

    return (
        <div id="notebooksView-wrapper">
            <p>Hello from notebooks view!</p>
            <div id="notebook-pages-list">
                {Object.keys(notebookPages).map(pageId => (
                    <div key={pageId}>{notebookPages[pageId].title}</div>
                ))}
            </div>
        </div>
    )
}

export default NotebooksView;
