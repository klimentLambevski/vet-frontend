import * as axios from 'axios';
import {localStorageService} from "./local-storage";
import {globalState} from "../store/global";


export function handleMutation(request, mutationName) {
  return request.then(response => {
    let data = response.data[mutationName];
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
    return axios('/graphql', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: globalState.token
      }
    })
      .then(res => {
        if(res.errors) {
          return Promise.reject(res.errors);
        } else {
          return Promise.resolve(res);
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