import { CallAPI } from "./axiosBase";
import { FILE_END_POINT, MOVE_FILE_END_POINT } from "../../constants/apiEndpoint";

export const moveFile = (sourcePath, destinationPath) => CallAPI(MOVE_FILE_END_POINT, 'POST', {
  sourcePath,
  destinationPath
});

export const removeFileFromPath = (path) => CallAPI(FILE_END_POINT, 'DELETE', {}, { path })