import dispatcher from "../appDispatcher";
import * as lotofacilApi from "../api/lotofacilApi";
import actionTypes from "./actionTypes";

export function loadJogos() {
  var listJogos = localStorage.getItem("listJogos");
  if (listJogos) {
    return new Promise(resolve => {
      var jogos = JSON.parse(listJogos);
      dispatcher.dispatch({
        actionType: actionTypes.LOAD_LOTOFACIL,
        jogos
      });
      resolve();
      return;
    });
  }
  return lotofacilApi.getList().then(jogos => {
    if (jogos.success) {
      localStorage.setItem("listJogos", JSON.stringify(jogos));
    }
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_LOTOFACIL,
      jogos
    });
  });
}

export function loadJogo(id) {
  return lotofacilApi.getById(id).then(jogo => {
    dispatcher.dispatch({
      actionType: actionTypes.GET_JOGO_LOTOFACIL,
      jogo
    });
  });
}
