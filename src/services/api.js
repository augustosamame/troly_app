import axios from 'axios';
import { ENDPOINT } from '../config';

export const get = (endpoint, headers = {}) => new Promise((resolve, reject) => {
//    AsyncStorage.getItem('id_token', (err, jwt) => {
//      headers.Authorization = jwt
  axios({
    method: 'GET',
    url: ENDPOINT + endpoint,
    headers,
  })
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
// });
});

export const post = (endpoint, payload = {}, headers = {}) => new Promise((resolve, reject) => {
//    AsyncStorage.getItem('id_token', (err, jwt) => {
//      headers.Authorization = jwt
  axios({
    method: 'POST',
    url: ENDPOINT + endpoint,
    headers,
    data: payload,
  })
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
// });
});

export const put = (endpoint, payload = {}, headers = {}) => new Promise((resolve, reject) => {
//    AsyncStorage.getItem('id_token', (err, jwt) => {
//      headers.Authorization = jwt
  axios({
    method: 'PUT',
    url: ENDPOINT + endpoint,
    headers,
    data: payload,
  })
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
// });
});

export const destroy = (endpoint, headers = {}) => new Promise((resolve, reject) => {
//    AsyncStorage.getItem('id_token', (err, jwt) => {
//      headers.Authorization = jwt
  axios({
    method: 'DELETE',
    url: ENDPOINT + endpoint,
    headers,
  })
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
// });
});
