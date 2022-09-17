import React from 'react';
import './MainPage.styles.scss';
import DirectoryTree from "../../components/DirectoryTree/DirectoryTree";
import ConsoleView from "../../components/ConsoleView/ConsoleView";


const MainPage = () => {


  return (
    <div className={'main-page'}>
      <DirectoryTree/>
      <ConsoleView/>
    </div>
  );
}

export default MainPage;