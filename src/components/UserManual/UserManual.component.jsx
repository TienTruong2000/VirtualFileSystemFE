import React from "react";
import './UserManual.styles.scss';

const UserManual = () => {
  return (
    <div className={'user-manual'}>
      <div className={'header'}>
        <h3>File system with Command Line Interface</h3>
        <h6>--- Created by Truong Tran Tien ---</h6>
      </div>
      <div className={'content'}>
        <h3>User manual</h3>
        <ul style={{ marginLeft: '1rem' }}>
          <li>Type "help + Enter" to show list of available commands.</li>
          <li>Press UP or DOWN to access previous/next command.</li>
          <li>
            <div>The file path in this system is absolute path from the root path '/'.</div>
            <div>Example: /directory, /new directory/new file</div>
          </li>
          <li>
            <div>To use space in side an argument, surrounding it with "" or ''</div>
            <div>Example: cat "/new file"</div>
          </li>
        </ul>
      </div>
      <div className={'footer'}>You can check the documentation <a
        href={"https://modern-bandicoot-659.notion.site/Virtual-file-system-with-CLI-70f8136e6cbd417cb888fa2966267a05"}>here</a>.
      </div>
    </div>
  )
}

export default UserManual;