import dispatcher from "../appDispatcher";
import * as statisticsApi from "../api/statisticsApi";
import actionTypes from "./actionTypes";

// export function statisticsActions() {
//   return statisticsApi.getList().then(jogos => {
//     dispatcher.dispatch({
//       actionType: actionTypes.LOAD_LOTOFACIL,
//       jogos
//     });
//   });
// }
export function loadStatistics(loteria) {
  var infoLoteria = {};
  return statisticsApi.getById(loteria).then(statistics => {
    infoLoteria[loteria] = statistics.data;
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_STATISTICS,
      statistics: infoLoteria
    });
  });
}
