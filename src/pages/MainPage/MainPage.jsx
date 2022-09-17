import React, { useRef, useState } from 'react';
import './MainPage.styles.scss';
import { DATE_FORMAT, ROOT_ID } from "../../constants/appConstants";
import { getDirectoryById } from "../../services/directoryService";
import moment from 'moment';


const DirectoryTree = () => {
  return (
    <div className={'directory-tree'}>
      Directory tree
    </div>
  )
}

const ConsoleView = ({ inputRef }) => {

  const [currentDir, setCurrentDir] = useState('/');
  const [currentDirId, setCurrentDirId] = useState(ROOT_ID);
  const [commands, setCommands] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const onBlur = (event) => {
    event.target.focus()
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const additionCommands = [<span>{currentDir}>{inputValue}</span>]
    if (inputValue.includes("ls")){
      try{
        const {data} = await getDirectoryById(currentDirId);
        const result = <div>
          <pre>Size: {data.size}</pre>
          {data.children?.map(child => {
            return <pre>
              {moment(child.createdAt).format(DATE_FORMAT)}   {child.type}   {child.size}   {child.name}
            </pre>})
          }
        </div>
        additionCommands.push(result);
      } catch (e){
        additionCommands.push('Something went wrong! Please refresh page and try again')
      }

    }


    setCommands(prevState => {
      return [...prevState, ...additionCommands];
    })
    setInputValue("");



  }

  const onChange = (event) => {
    setInputValue(event.target.value);
  }


  return (<div className={'console-view'}>
    {commands.map((command, index) => {
      return <div key={index}>{command}</div>
    })}
    <form onSubmit={onSubmit}>
      {currentDir}><input ref={inputRef} onBlur={onBlur} autoFocus={true} onChange={onChange} type='text'
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