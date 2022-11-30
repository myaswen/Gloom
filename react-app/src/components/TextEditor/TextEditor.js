import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./TextEditor.css";

const TextEditor = ({ content, setContent }) => {
    const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', { 'script': 'super' }],
        // [{ 'script': 'super' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ];

    return <ReactQuill id="quill-comp" theme="snow" value={content} onChange={setContent} modules={{toolbar: toolbarOptions}}/>
}

export default TextEditor;
