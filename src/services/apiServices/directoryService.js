import { CallAPI } from "./axiosBase";
import { DIRECTORY_END_POINT } from "../../constants/apiEndpoint";


export const getDirectoryById = (id) => CallAPI(`${DIRECTORY_END_POINT}/${id}`, 'GET');
export const getDirectoryByPath = (path) => CallAPI(`${DIRECTORY_END_POINT}`, 'GET', {}, { path });
export const createDirectory = (path) => CallAPI(DIRECTORY_END_POINT, 'POST', {}, { path })