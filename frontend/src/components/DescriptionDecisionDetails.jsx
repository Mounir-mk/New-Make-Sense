import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";

function DescriptionDecisionDetails({ title, content }) {
  const parsedContent = parse(content);
  return (
    <details className="group w-full mx-2 md:mx-0">
      <summary className="text-2xl list-none before:content-['+'] before:inline-block before:align-middle group-open:before:rotate-180 group-open:before:content-['-'] font-bold text-[#0C3944] group-open:text-[#9B084F] group-open:bg-slate-100 before:mr-3 border-b-2 pb-4 pt-4">
        {title}
      </summary>
      <p className="group-open:bg-slate-100 group-open:py-3 group-open:px-2">
        {parsedContent}
      </p>
    </details>
  );
}

DescriptionDecisionDetails.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default DescriptionDecisionDetails;
