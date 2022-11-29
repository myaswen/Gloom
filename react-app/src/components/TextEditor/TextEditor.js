import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./TextEditor.css";

const TextEditor = ({ content, setContent }) => {

    return <ReactQuill id="quill-comp" theme="snow" value={content} onChange={setContent} />
}

export default TextEditor;
