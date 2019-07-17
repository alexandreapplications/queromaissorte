import { handleResponse, handleError } from "./apiUtils";
const baseUrl = `${process.env.REACT_APP_API_URL}/lotofacil/`;

export function getList() {
  return fetch(baseUrl + "?initialRecord=0&recordCount=100")
    .then(handleResponse)
    .catch(handleError);
}

export function getById(id) {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
