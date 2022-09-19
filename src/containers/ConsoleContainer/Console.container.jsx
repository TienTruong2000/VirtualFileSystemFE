import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import useEventListener from "../../hooks/useEventListener";
import commandHandler from "../../services/commandService";
import CommandDictionaryContext from "../../contexts/CommandDictionaryContext";
import ConsoleCommand from "../../components/ConsoleCommand/ConsoleCommand.component";
import ConsoleView from "../../components/ConsoleView/ConsoleView.component";

const ConsoleViewContainer = () => {

  const [currentDir, setCurrentDir] = useState("/");
  const [consoleContents, setConsoleContents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const commandListRef = useRef([]);
  const currentCommandRef = useRef();
  const inputRef = useRef();
  const commandDictionary = useContext(CommandDictionaryContext);


  useEffect(() => {
    // Moving cursor to the end
    inputRef.current.selectionStart = inputRef.current.value.length;
    inputRef.current.selectionEnd = inputRef.current.value.length;
  }, [currentCommandRef.current]);

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
    await commandHandler(inputValue, additionalConsoleContents, commandDictionary)
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

  const viewProps = { onClick, consoleContents, inputRef, inputValue, onSubmit, onChange, currentDir };

  return <ConsoleView {...viewProps}/>


}

export default ConsoleViewContainer;