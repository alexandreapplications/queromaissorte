const service = require("../services/statisticsServices")();
const responseUtil = require("../@common/responseUtil");
module.exports = () => {
  this.getStatistics = (req, res) => {
    service
      .getStatistics(req.params.loteria)
      .then(value => {
        responseUtil.okResponse(res, null, value);
        return true;
      })
      .catch(reason => {
        responseUtil.errorResponse(res, null, reason);
      });
  };

  return this;
};
