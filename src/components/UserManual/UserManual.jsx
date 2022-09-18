import React from "react";

const UserManual = () => {
  return (
    <div className={'directory-tree'}>
      <div className={'header'}>
        <h3>File system with Command Line Interface</h3>
        <h6>--- Created by Truong Tran Tien ---</h6>
      </div>
      <div className={'manual'}>
        <h3>User manual</h3>
        <div>Type "help + Enter" to show list of available commands.</div>
        <div>Press UP or DOWN to access previous/next command.</div>
      </div>
      <div className={'footer'}>You can check the source code <a href={"#"}>here</a>.</div>
    </div>
  )
}

export default UserManual;