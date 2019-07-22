import { handleResponse, handleError } from "./apiUtils";
const baseUrl = `${process.env.REACT_APP_API_URL}/statistics`;

// export function getList() {
//   return fetch(baseUrl + "/lotofacil")
//     .then(handleResponse)
//     .catch(handleError);
// }

export function getById(loteria) {
  return fetch(`${baseUrl}/${loteria}`)
    .then(handleResponse)
    .catch(handleError);
}
