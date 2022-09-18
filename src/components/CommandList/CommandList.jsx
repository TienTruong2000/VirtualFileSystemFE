import { commandDictionary } from "../../constants/commandDictionary";
import React from "react";

const CommandList = () => {
  return (
    <div>
      <pre>Commands: </pre>
      <div>
        {Object.keys(commandDictionary).map((command, index) => {
          return (
            <div key={index} style={{ display: "flex", marginLeft: '1rem' }}>
              <div style={{ minWidth: '80px' }}>
                <pre>{command}</pre>
              </div>
              <div>
                <pre>{commandDictionary[command].description}</pre>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CommandList