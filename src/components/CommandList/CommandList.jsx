import React, { useContext } from "react";
import CommandDictionaryContext from "../../contexts/CommandDictionaryContext";

const CommandList = () => {
  const commandDictionary = useContext(CommandDictionaryContext);
  return (
    <div>
      <pre style={{ color: "#7c7b18" }}>List of supported commands: </pre>
      <div>
        {Object.keys(commandDictionary).map((command, index) => {
          return (
            <div key={index} style={{ display: "flex", marginLeft: '1rem' }}>
              <div style={{ minWidth: '80px' }}>
                <pre>{command}</pre>
              </div>
              <div>
                <pre>{commandDictionary[command].shortDescription}</pre>
              </div>
            </div>
          )
        })}
      </div>
      <br/>
    </div>
  )
}

export default CommandList