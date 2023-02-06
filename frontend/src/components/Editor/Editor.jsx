import React, { useRef, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";

function Editor({ setValue, value }) {
  const quillRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

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
    <div
      id="quill-container"
      className={`${
        isFocused
          ? "absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-slate-600 bg-opacity-60"
          : "mb-16"
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <ReactQuill
        theme="snow"
        ref={quillRef}
        modules={modules}
        className={`${
          isFocused
            ? "md:w-1/2 w-[350px] h-1/2 bg-white"
            : "px-2 md:px-4 py-1 md:py-2 bg-white"
        }}`}
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
