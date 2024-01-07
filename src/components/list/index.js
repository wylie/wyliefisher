import React from "react";

import Anchor from "../anchor";

import "./_index.css";

import { links } from "../../data/links.js";

const List = () => {
  return (
    <ul className="List">
      {links.map((item, index) => (
        <li className="List_item" key={index}>
          <Anchor href={item.href} children={item.title} />
        </li>
      ))}
    </ul>
  );
};

List.displayName = "List";

export default List;
