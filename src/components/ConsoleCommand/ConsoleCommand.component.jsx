import React from "react";

const ConsoleCommand = ({ dir, command }) => {
  return (<span className={'command'}><span>{dir}></span>{command}</span>)
}

export default ConsoleCommand;