import { CallAPI } from "./axiosBase";
import { MOVE_FILE_END_POINT } from "../../constants/apiEndpoint";

export const moveFile = (sourcePath, destinationPath) => CallAPI(MOVE_FILE_END_POINT, 'POST', {
  sourcePath,
  destinationPath
});