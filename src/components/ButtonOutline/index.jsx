import React from "react";
import "./styles.scss";

export default function ButtonOutline({
  className,
  name,
  bwidth,
  bg,
  outline,
  color,
  fz,
  onClick,
  icon,
}) {
  return (
    <button
      onClick={onClick || (() => {})}
      className={`btn-outline ${className ? className : ""}`}
      style={{
        width: bwidth ? bwidth : "",
        backgroundColor: bg ? bg : "",
        outline: outline ? outline : "",
        color: color ? color : "",
        fontSize: fz ? fz : "",
      }}
    >
      {icon ? icon : ""}
      {name}
    </button>
  );
}
