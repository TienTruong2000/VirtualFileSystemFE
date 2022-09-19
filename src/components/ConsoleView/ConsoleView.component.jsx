import ConsoleForm from "../ConsoleForm/ConsoleForm";
import React from "react";
import "./ConsoleView.styles.scss";

const ConsoleView = ({ onClick, consoleContents, inputRef, inputValue, onSubmit, onChange, currentDir }) => {
  return (<div className={'console-view'} onClick={onClick}>
    {consoleContents.map((command, index) => {
      return <div key={index}>{command}</div>
    })}
    <ConsoleForm inputRef={inputRef} inputValue={inputValue} onFormSubmit={onSubmit} onInputChange={onChange}
                 currentDirPath={currentDir}/>
  </div>)
}

export default ConsoleView;