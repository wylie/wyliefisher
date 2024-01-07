import React from "react";
import PropTypes from "prop-types";

import "./_index.css";

const Anchor = ({ href, children }) => {
  return (
    <a className="Anchor" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

Anchor.displayName = "Anchor";

Anchor.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string
};

export default Anchor;
