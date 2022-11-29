import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./TextEditor.css";

const TextEditor = () => {

    return <ReactQuill id="quill-comp" theme="snow" />
}

export default TextEditor;
