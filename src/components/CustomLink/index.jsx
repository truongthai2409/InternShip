import React from "react";
import "./styles.scss";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li className={`custom-li ${match && "active"}`}>
      <Link className="custom-link" to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default CustomLink;
