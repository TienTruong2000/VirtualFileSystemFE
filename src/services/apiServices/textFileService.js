import { CallAPI } from "./axiosBase";
import { TEXT_FILE_END_POINT } from "../../constants/apiEndpoint";


export const createTextFile = (path, content) => CallAPI(TEXT_FILE_END_POINT, 'POST', { path, content })