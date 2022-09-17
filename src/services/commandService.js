import moment from "moment/moment";
import { DATE_FORMAT } from "../constants/appConstants";
import React from "react";
import { createDirectory, getDirectoryById } from "./apiServices/directoryService";
import { supportedCommand } from "../constants/commandDictionary";

const lsCommandHandler = async (currentDirId) => {
  const { data } = await getDirectoryById(currentDirId);
  return (<div>
    <pre>Size: {data.size}</pre>
    {data.children?.map(child => {
      return <pre key={child.id}>
              {moment(child.createdAt).format(DATE_FORMAT)} {child.type} {child.size} {child.name}
            </pre>
    })
    }
    <br/>
  </div>);
}

const crCommandHandler = async (commandElements) => {
  const path = commandElements[1];
  const { data } = await createDirectory(path);
  return (<span>Create directory with name '{data.name}' successfully.</span>);
}


const commandHandler = async (currentDirId, commandElements, additionalConsoleContents) => {
  if (commandElements === null || commandElements.length === 0) return;
  const command = commandElements[0];
  try {
    if (!Object.keys(supportedCommand).includes(command)) {
      additionalConsoleContents.push(<span>'{command}' is not recognized as a valid command. Type 'help' to show list of commands.</span>);
      return;
    }
    let result = "";
    if (command === supportedCommand.ls) {
      result = await lsCommandHandler(currentDirId)
    } else if (command === supportedCommand.cr) {
      result = await crCommandHandler(commandElements);
    } else if (command === "cd") {

    }
    additionalConsoleContents.push(result);

  } catch (e) {
    if (e?.response?.status === 400) {
      additionalConsoleContents.push(e.response.data.message)
    } else {
      additionalConsoleContents.push(<span>Something went wrong! Please refresh page and try again!</span>)
    }
  }
};

export default commandHandler;