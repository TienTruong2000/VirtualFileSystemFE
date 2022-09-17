import { CallAPI } from "./axiosBase";
import { DIRECTORY_END_POINT } from "../constants/apiEndpoint";


export const getDirectoryById = (id) => CallAPI(`${DIRECTORY_END_POINT}/${id}`, 'GET');