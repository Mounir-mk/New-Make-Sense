import React from "react";
import PropTypes from "prop-types";

function DescriptionDecisionDetails({ title }) {
  return (
    <details className="group w-full">
      <summary className="text-2xl list-none before:content-['+'] before:inline-block before:align-middle group-open:before:rotate-180 group-open:before:content-['-'] font-bold text-[#0C3944] group-open:text-[#9B084F] group-open:bg-slate-100 before:mr-3 border-b-2 pb-4 pt-4">
        {title}
      </summary>
      <p className="group-open:bg-slate-100">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, eum
        voluptatum est deserunt quam a doloribus dolorem ad minima, illum
        aperiam natus sit hic ipsa odit dolor incidunt magni
        culpa.fezeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeee
      </p>
    </details>
  );
}

DescriptionDecisionDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DescriptionDecisionDetails;
