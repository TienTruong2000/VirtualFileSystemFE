import React, { useCallback, useEffect, useRef, useState } from 'react';
import './MainPage.styles.scss';
import { DATE_FORMAT, ROOT_ID } from "../../constants/appConstants";
import { createDirectory, getDirectoryById } from "../../services/directoryService";
import moment from 'moment';
import useEventListener from "../../hooks/useEventListener";


const DirectoryTree = () => {
  return (
    <div className={'directory-tree'}>
      Directory tree
    </div>
  )
}

const ConsoleCommand = ({dir, command}) => {
  return (<span className={'command'}><span>{dir}></span>{command}</span>)
}

const ConsoleView = ({ inputRef }) => {

  const [currentDir, setCurrentDir] = useState("/");
  const [currentDirId, setCurrentDirId] = useState(ROOT_ID);
  const [consoleContents, setConsoleContents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const commandListRef = useRef([]);
  const currentCommandRef = useRef();

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


  const onBlur = (event) => {
    event.target.focus()
  }

  const commandHandler = async (commandElements, additionalConsoleContents) => {
    if (commandElements === null || commandElements.length === 0) return;
    const command = commandElements[0];
    try {
      if (command === "ls") {
        const { data } = await getDirectoryById(currentDirId);
        const result = <div>
          <pre>Size: {data.size}</pre>
          {data.children?.map(child => {
            return <pre key={child.id}>
              {moment(child.createdAt).format(DATE_FORMAT)} {child.type} {child.size} {child.name}
            </pre>
          })
          }
          <br/>
        </div>
        additionalConsoleContents.push(result);
      } else if (command === "cr") {
        const path = commandElements[1];
        const { data } = await createDirectory(path);
        additionalConsoleContents.push(<span>Create directory with name '{data.name}' successfully.</span>)
      } else if (command === "cd") {

      }
    } catch (e) {
      if (e?.response?.status === 400) {
        additionalConsoleContents.push(e.response.data.message)
      } else {
        additionalConsoleContents.push(<span>Something went wrong! Please refresh page and try again!</span>)
      }
    }
  }


  const onSubmit = async (event) => {
    event.preventDefault();
    const additionalConsoleContents = [<ConsoleCommand dir={currentDir} command={inputValue} />]
    const commandElements = inputValue.split(" ");
    await commandHandler(commandElements, additionalConsoleContents)
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

  const onFocus = (event) => {
    event.currentTarget.setSelectionRange(event.currentTarget.value.length, event.currentTarget.value.length)
   }

  return (<div className={'console-view'}>
    {consoleContents.map((command, index) => {
      return <div key={index}>{command}</div>
    })}
    <form onSubmit={onSubmit}>
      {currentDir}><input ref={inputRef} onBlur={onBlur} autoFocus={true} onChange={onChange} onFocus={onFocus}
                          type='text'
                          value={inputValue}/>
    </form>
  </div>)


}

const MainPage = () => {
  const inputRef = useRef();

  const onClick = () => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }

  return (
    <div className={'main-page'} onClick={onClick}>
      <DirectoryTree/>
      <ConsoleView inputRef={inputRef}/>
    </div>
  );
}

export default MainPage;