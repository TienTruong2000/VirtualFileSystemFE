import moment from "moment/moment";
import { DATE_FORMAT } from "../constants/appConstants";
import React from "react";
import { createDirectory, getDirectoryByPath } from "./apiServices/directoryService";
import { commandDictionary, supportedCommand } from "../constants/commandDictionary";
import { createTextFile, getTextFileByPath } from "./apiServices/textFileService";
import { moveFile, removeFileFromPath } from "./apiServices/fileService";
import CommandList from "../components/CommandList/CommandList";
import CommandHelp from "../components/CommandHelp/CommandHelp";

const lsCommandHandler = async (commandElements) => {
  const fileType = {
    REGULAR_FILE: "-",
    DIRECTORY: "d",
    ROOT: "d"
  }
  const path = commandElements.slice(1).join(" ");
  if (path === undefined) {
    return (<span>The syntax of the command is incorrect. Type 'help cr' command usage.</span>);
  }
  const { data } = await getDirectoryByPath(path);
  return (<div>
    <pre>Size: {data.size}</pre>
    <pre>Type: {data.type}</pre>
    {data.children?.map(child => {
      return <pre key={child.id}>
              {moment(child.createdAt).format(DATE_FORMAT)} {fileType[child.type]} {child.size} {child.name}
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

const catCommandHandler = async (commandElements) => {
  const path = commandElements.slice(1).join(" ");
  if (path === undefined) {
    return (<span>The syntax of the command is incorrect. Type 'help cat' for command usage.</span>);
  }
  const res = await getTextFileByPath(path);
  const data = res.data;
  return (<span>{data.content}</span>);
}

const mvCommandHandler = async (commandElement) => {
  const sourcePath = commandElement[1];
  const destinationPath = commandElement[2];
  if (sourcePath === undefined || destinationPath === undefined) {
    return (<span>The syntax of the command is incorrect. Type 'help mv' for command usage.</span>);
  }
  const res = await moveFile(sourcePath, destinationPath);
  const data = res.data;
  return (<span>Move file '{data.name}' to {destinationPath} successfully.</span>);
}

const rmCommandHandler = async (commandElement) => {
  const removePaths = commandElement.slice(1).filter(path => path !== "");
  if (removePaths.length === 0)
    return (<span>The syntax of the command is incorrect. Type 'help rm' for command usage.</span>);
  const promises = removePaths.map(path => removeFileFromPath(path));
  const responses = await Promise.allSettled(promises);
  return (
    <div>
      {responses.map((response, index) => {
        if (response.status === "rejected"){
          return (
            <>
              <span>Remove file with path '{removePaths[index]}' failed. {response.reason.response.data.message}</span>
              <br/>
            </>)
        }
        if (response?.value?.status === 200) {
          return (
            <>
              <span>Remove file '{response.value?.data.name}' successfully.</span>
              <br/>
            </>
          )
        } else {
          return (
            <>
              <span>Remove file with path '{removePaths[index]}' failed.</span>
              <br/>
            </>)
        }
      })}
    </div>
  );
}

const helpCommandHandler = async (commandElement) => {
  const helpCommand = commandElement[1];
  if (helpCommand === undefined)
    return <CommandList/>;
  const commandDefinition = commandDictionary[helpCommand];
  if (commandDefinition === undefined)
    return <span>This command is not supported by the help utility.</span>
  return (
    <CommandHelp commandDefinition={commandDefinition}/>
  )
}

const parseCommand = (commandValue) => {
  const command = commandValue.trim();
  const result = [];
  const stack = [];
  for (let character of command) {
    if (character === " ") {
      if (stack[0] === "'" || stack[0] === '"') {
        stack.push(character);
        continue;
      }
      const keyword = stack.join("");
      if (keyword.trim().length !== 0) {
        result.push(keyword);
      }
      stack.splice(0, stack.length);
      continue;
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
    if (character === "/") {
      if (stack[stack.length - 1] !== " ") {
        stack.push(character);
        continue;
      }
      const keyword = stack.join("");
      if (keyword.trim().length !== 0) {
        result.push(keyword.trim());
      }
      stack.splice(0, stack.length);
    }
    stack.push(character);
  }
  const keyword = stack.join("");
  if (keyword.trim().length !== 0) {
    result.push(keyword.trim());
  }
  return result;
}

const commandHandler = async (currentDirId, commandValue, additionalConsoleContents) => {
  const commandElements = parseCommand(commandValue);
  if (commandElements === null || commandElements.length === 0) return;
  const command = commandElements[0];
  try {
    let result;
    switch (command) {
      case supportedCommand.ls:
        result = await lsCommandHandler(commandElements);
        break;
      case supportedCommand.cr:
        result = await crCommandHandler(commandElements);
        break;
      case supportedCommand.cat:
        result = await catCommandHandler(commandElements);
        break;
      case supportedCommand.mv:
        result = await mvCommandHandler(commandElements);
        break;
      case supportedCommand.rm:
        result = await rmCommandHandler(commandElements);
        break;
      case supportedCommand.help:
        result = await helpCommandHandler(commandElements);
        break;
      default:
        result = <span>'{command}' is not recognized as a valid command. Type 'help' to show list of commands.</span>;
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