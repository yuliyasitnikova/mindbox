import React, { FC } from "react";
import cx from "classnames";

import { ReactComponent as Icon } from "./images/close.svg";
import "./style.css";

interface Props {
  className?: string;
  onClick?: () => void;
}

export const Close: FC<Props> = ({ className, onClick }) => (
  <button className={cx("close", className)} type="button" aria-label="Close" onClick={onClick}>
    <Icon className="close--icon" aria-hidden="true" />
  </button>
);
