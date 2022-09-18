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
        <ul style={{marginLeft: '1rem'}}>
          <li>Type "help + Enter" to show list of available commands.</li>
          <li>Press UP or DOWN to access previous/next command.</li>
          <li>
            <div>The file path in this system is absolute path from the root path '/'.</div>
            <div>Example: /directory, /new directory/new file</div>
          </li>
        </ul>
      </div>
      <div className={'footer'}>You can check the source code <a href={"#"}>here</a>.</div>
    </div>
  )
}

export default UserManual;