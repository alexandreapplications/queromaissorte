import { EventEmitter } from "events";
import Dispatcher from "../../appDispatcher";
import actionTypes from "../../actions/actionTypes";

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

  getJogos() {
    return _jogos;
  }
}

const store = new JogoStore();
Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.LOAD_LOTOFACIL:
      _jogos = action.jogos;
      store.emitChange();
      break;
    default:
    // nothing to do
  }
});
export default store;
