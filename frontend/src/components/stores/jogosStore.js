import { EventEmitter } from "events";
import Dispatcher from "../../appDispatcher";
import actionTypes from "../../actions/actionTypes";
import { loadJogos } from "../../actions/lotofacilActions";

const CHANGE_EVENT = "change";
let _jogos = [];

class JogoStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getJogos(inicio, recordCount) {
    var fim = inicio + recordCount;
    return _jogos.filter(x => x.id >= inicio && x.id < fim);
  }

  loadJogos(inicio, recordCount) {
    loadJogos(inicio, recordCount);
  }
}

const store = new JogoStore();
Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.LOAD_LOTOFACIL:
      var currentIds = _jogos.map(x => x.id);
      for (var item in action.jogos) {
        if (currentIds.indexOf(action.jogos[item].id) < 0)
          _jogos.push(action.jogos[item]);
      }
      localStorage.setItem("lotofacilData", JSON.stringify(_jogos));
      store.emitChange();
      break;
    default:
    // nothing to do
  }
});
export default store;
