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
    url: 'http://localhost:5000' + endpoint,
    headers,
    data: body,
    responseType,
    params
  });
};

