import React from "react";
import PropTypes from "prop-types";

function DescriptionDecisionDetails({ title }) {
  return (
    <details className="group">
      <summary className="text-2xl list-none before:content-chevron-down before:inline-block before:align-middle group-open:before:rotate-180">
        {title}
      </summary>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, eum
      voluptatum est deserunt quam a doloribus dolorem ad minima, illum aperiam
      natus sit hic ipsa odit dolor incidunt magni culpa.
    </details>
  );
}

DescriptionDecisionDetails.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DescriptionDecisionDetails;
