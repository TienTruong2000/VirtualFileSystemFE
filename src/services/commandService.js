import moment from "moment/moment";
import { DATE_FORMAT } from "../constants/appConstants";
import React from "react";
import { createDirectory, getDirectoryById } from "./apiServices/directoryService";
import { supportedCommand } from "../constants/commandDictionary";
import { createTextFile } from "./apiServices/textFileService";

const lsCommandHandler = async (currentDirId) => {
  const fileType = {
    REGULAR_FILE: "-",
    DIRECTORY: "d",
  }
  const { data } = await getDirectoryById(currentDirId);
  return (<div>
    <pre>Size: {data.size}</pre>
    {data.children?.map(child => {
      return <pre key={child.id}>
              {moment(child.createdAt).format(DATE_FORMAT)}   {fileType[child.type]}   {child.size}   {child.name}
            </pre>
    })
    }
    <br/>
  </div>);
}

const crCommandHandler = async (commandElements) => {
  const path = commandElements[1];
  const fileData = commandElements[2];
  if (path === undefined) {
    return (<span>The syntax of the command is incorrect. Type 'help cr' command usage.</span>);
  }
  let data;
  if (fileData === undefined) {
    const res = await createDirectory(path);
    data = res.data;
    return (<span>Create directory with name '{data.name}' successfully.</span>);
  }
  const res = await createTextFile(path, fileData);
  data = res.data;
  return (<span>Create file with name '{data.name}' successfully.</span>);

}

const parseCommand = (commandValue) => {
  const command = commandValue.trim();
  const result = [];
  const stack = [];
  for (let character of command) {
    if (character === " ") {
      if (stack[0] !== "'" && stack[0] !== '"') {
        const keyword = stack.join("");
        if (keyword.trim().length !== 0) {
          result.push(keyword);
        }
        stack.splice(0, stack.length);
        continue;
      }
    }
    if (character === "'" && stack[0] === "'") {
      const keyword = stack.join("");
      if (keyword.trim().length !== 0) {
        result.push(keyword.substring(1, keyword.length));
      }
      stack.splice(0, stack.length);
      continue;
    }
    if (character === '"' && stack[0] === '"') {
      const keyword = stack.join("");
      if (keyword.trim().length !== 0) {
        result.push(keyword.substring(1, keyword.length));
      }
      stack.splice(0, stack.length);
      continue;
    }
    stack.push(character);
  }
  const keyword = stack.join("");
  if (keyword.trim().length !== 0) {
    result.push(keyword);
  }
  debugger;
  return result;
}

const commandHandler = async (currentDirId, commandValue, additionalConsoleContents) => {
  const commandElements = parseCommand(commandValue);
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