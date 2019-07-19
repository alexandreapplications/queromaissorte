const statisticsModel = require("../models/statisticsModel")();

module.exports = () => {
  this.get = loteria => statisticsModel.getStatistics(loteria);

  return this;
};
