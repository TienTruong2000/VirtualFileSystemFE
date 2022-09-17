import React, { useCallback, useEffect, useRef, useState } from "react";
import { ROOT_ID } from "../../constants/appConstants";
import useEventListener from "../../hooks/useEventListener";
import commandHandler from "../../services/commandService";


const ConsoleCommand = ({ dir, command }) => {
  return (<span className={'command'}><span>{dir}></span>{command}</span>)
}

const ConsoleForm = ({ currentDirPath, onFormSubmit, onInputChange, inputRef, inputValue }) => {

  const onBlur = (event) => {
    event.target.focus()
  }

  return (<form onSubmit={onFormSubmit}>
    {currentDirPath}><input ref={inputRef} onBlur={onBlur} autoFocus={true} onChange={onInputChange}
                            type='text'
                            value={inputValue}/>
  </form>)
}

const ConsoleView = () => {

  const [currentDir, setCurrentDir] = useState("/");
  const [currentDirId, setCurrentDirId] = useState(ROOT_ID);
  const [consoleContents, setConsoleContents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const commandListRef = useRef([]);
  const currentCommandRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    // Moving cursor to the end
    inputRef.current.selectionStart = inputRef.current.value.length;
    inputRef.current.selectionEnd = inputRef.current.value.length;
  }, [inputValue]);

  const keyDownHandler = useCallback((e) => {
    const keyEvent = {
      ARROW_UP: 38,
      ARROW_DOWN: 40
    }

    switch (e.keyCode) {
      case keyEvent.ARROW_UP:
        let prevCommand = "";
        if (currentCommandRef.current !== undefined) {
          currentCommandRef.current -= 1;
          if (currentCommandRef.current < 0) currentCommandRef.current = 0;
          prevCommand = commandListRef.current[currentCommandRef.current]
        }
        setInputValue(prevCommand);
        break;
      case keyEvent.ARROW_DOWN:
        let nextCommand = "";
        if (currentCommandRef.current !== undefined) {
          currentCommandRef.current += 1;
          if (currentCommandRef.current > commandListRef.current.length - 1) currentCommandRef.current = commandListRef.current.length - 1;
          nextCommand = commandListRef.current[currentCommandRef.current]
        }
        setInputValue(nextCommand);
        break;
      default:
        break;
    }
  }, []);

  useEventListener("keydown", keyDownHandler);


  const onSubmit = async (event) => {
    event.preventDefault();
    const additionalConsoleContents = [<ConsoleCommand dir={currentDir} command={inputValue}/>]
    const commandElements = inputValue.split(" ");
    await commandHandler(currentDirId, commandElements, additionalConsoleContents)
    setConsoleContents(prevState => {
      return [...prevState, ...additionalConsoleContents];
    });
    commandListRef.current.push(inputValue);
    setInputValue("");
    inputRef.current.scrollIntoView({ behavior: "smooth" });
    currentCommandRef.current = commandListRef.current.length;
  }

  const onChange = (event) => {
    setInputValue(event.target.value);
  }

  const onClick = () => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }

  return (<div className={'console-view'}>
    {consoleContents.map((command, index) => {
      return <div key={index}>{command}</div>
    })}
    <ConsoleForm inputRef={inputRef} inputValue={inputValue} onFormSubmit={onSubmit} onInputChange={onChange}
                 currentDirPath={currentDir}/>
  </div>)


}

export default ConsoleView;