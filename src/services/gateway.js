import * as axios from 'axios';
import {localStorageService} from "./local-storage";
import {globalState} from "../store/global";


export function handleMutation(request, mutationName) {
  return request.then(response => {
    let data = response[mutationName];
    if(data.errors) {
      return Promise.reject(data.errors);
    }
    return Promise.resolve(data);
  }).catch(error => Promise.reject(error))
}

export function graphql([query]) {
  return (variables) => {
    let body = {
      query: query,
      variables: variables
    };
    return axios.post('/graphql', body, {
      headers: {
        Authorization: globalState.token
      }
    })
      .then(res => res.data)
      .catch(err => {
        if(err.response.data.errors) {
          return Promise.reject(err.response.data.errors);
        } else {
          return Promise.resolve(err.response.data.data);
        }
      })
      .then(res => {
        if(res.errors) {
          return Promise.reject(res.errors);
        } else {
          return Promise.resolve(res.data);
        }
      })
  }
}


export const get = (uri, params) => {
  return axios.get(uri, {
    params,
    headers: {
      Authorization: globalState.token
    }
  }).then(res => res.data);
};

export const post = (uri, data) => {
  return axios.post(uri, data).then(res => res.data);
};