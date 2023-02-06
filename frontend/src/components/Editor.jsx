import React, { useRef, useMemo } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    <div className="flex flex-col gap-6 mt-16">
      <ReactQuill
        theme="snow"
        ref={quillRef}
        modules={modules}
        style={{ height: "300px", marginBottom: "50px", width: "1000px" }}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

Editor.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Editor;
