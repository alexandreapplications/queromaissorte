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
    return _jogos.slice(inicio, inicio + recordCount);
  }

  loadJogos(inicio, recordCount) {
    if (inicio + recordCount > _jogos.length) {
      loadJogos(_jogos.length, recordCount);
    }
  }
}

const store = new JogoStore();
Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.LOAD_LOTOFACIL:
      for (var item in action.jogos) {
        _jogos.push(action.jogos[item]);
      }
      store.emitChange();
      break;
    default:
    // nothing to do
  }
});
export default store;
