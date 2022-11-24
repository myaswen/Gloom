import React, { useState } from "react";
import "./NotebooksDropdown.css";

const NotebooksDropdown = () => {
    const [showNotebooks, setShowNotebooks] = useState(false);

    return (
        <div id="notebooks-dropdown-wrapper">
            <div onClick={() => setShowNotebooks(!showNotebooks)}>Notebooks</div>
            {showNotebooks && (
                <div id="notebooks-dropdown-list">
                    <div>Notebook 1</div>
                    <div>Notebook 2</div>
                    <div>Notebook 3</div>
                    <div>Notebook 4</div>
                </div>
            )}
        </div>
    )
}

export default NotebooksDropdown;
