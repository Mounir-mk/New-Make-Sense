import React, { useRef, useMemo } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";

function Editor({ setValue, value }) {
  const quillRef = useRef();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
        ],
      },
    }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      ref={quillRef}
      modules={modules}
      value={value}
      onChange={setValue}
      className="flex-1 flex flex-col"
    />
  );
}

Editor.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Editor;
