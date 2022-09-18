import React from 'react';
import './MainPage.styles.scss';
import UserManual from "../../components/UserManual/UserManual";
import ConsoleView from "../../components/ConsoleView/ConsoleView";


const MainPage = () => {


  return (
    <div className={'main-page'}>
      <UserManual/>
      <ConsoleView/>
    </div>
  );
}

export default MainPage;