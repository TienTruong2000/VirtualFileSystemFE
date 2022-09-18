import axios from 'axios';

export const CallAPI = (
  endpoint,
  method = 'GET',
  body = {},
  params = {},
  configHeaders = null,
  responseType = null
) => {
  const headers = configHeaders
    ? configHeaders
    : {
      'content-type': 'application/json'
    };

  return axios({
    method,
    url: process.env.REACT_APP_API_URL + endpoint,
    headers,
    data: body,
    responseType,
    params
  });
};

