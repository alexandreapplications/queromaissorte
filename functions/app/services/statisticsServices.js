const statisticsModel = require("../models/statisticsModel")();

module.exports = () => {
  this.getStatistics = loteria => {
    return statisticsModel.getStatistics(loteria);
  };

  return this;
};
