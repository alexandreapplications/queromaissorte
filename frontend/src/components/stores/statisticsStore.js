import { EventEmitter } from "events";
import Dispatcher from "../../appDispatcher";
import actionTypes from "../../actions/actionTypes";

const CHANGE_EVENT = "change";
let _statistics = {};

class StatisticsStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getStatistics(loteria) {
    return _statistics[loteria];
  }
}

const store = new StatisticsStore();
Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.LOAD_STATISTICS:
      _statistics = action.statistics;
      store.emitChange();
      break;
    default:
    // nothing to do
  }
});
export default store;
