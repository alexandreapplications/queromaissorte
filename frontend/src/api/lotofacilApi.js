import { handleResponse, handleError } from "./apiUtils";
const baseUrl = `${process.env.REACT_APP_API_URL}/lotofacil/`;

export function getList(inicio, qtde) {
  return fetch(baseUrl + `?initialId=${inicio}&recordCount=${qtde}`)
    .then(handleResponse)
    .catch(handleError);
}

export function getById(id) {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
