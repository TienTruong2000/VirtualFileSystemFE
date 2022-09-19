import React from "react";

const ConsoleForm = ({ currentDirPath, onFormSubmit, onInputChange, inputRef, inputValue }) => {
  return (<form onSubmit={onFormSubmit}>
    {currentDirPath}><input ref={inputRef} autoFocus={true} onChange={onInputChange}
                            type='text'
                            value={inputValue}/>
  </form>)
}

export default ConsoleForm;