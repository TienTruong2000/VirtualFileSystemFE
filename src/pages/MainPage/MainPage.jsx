import React, { useEffect, useState } from 'react';
import './MainPage.styles.scss';
import UserManual from "../../components/UserManual/UserManual";
import ConsoleView from "../../components/ConsoleView/ConsoleView";
import { CommandDictionaryProvider } from "../../contexts/CommandDictionaryContext";


const MainPage = () => {

  const [commandDictionary, setCommandDictionary] = useState({});
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('commandDictionary.json');
    const json = await response.json();
    debugger;
    setCommandDictionary(json);
  }

  return (
    <div className={'main-page'}>
      <CommandDictionaryProvider value={commandDictionary}>
        <UserManual/>
        <ConsoleView/>
      </CommandDictionaryProvider>

    </div>
  );
}

export default MainPage;