const responseUtil = require("../@common/responseUtil");
const service = require("../services/sequenciaServices")();
module.exports = () => {
  this.get = (req, res) => {
    service
      .getAll(req.params.loteria)
      .then(value => {
        responseUtil.okResponse(res, req.params.loteria, value);
        return true;
      })
      .catch(reason => {
        responseUtil.errorResponse(res, req.params.loteria, reason);
      });
  };

  this.getSingle = (req, res) => {
    service
      .getSingle(req.params.loteria, req.params.id)
      .then(value => {
        responseUtil.okResponse(res, req.params.id, value);
        return true;
      })
      .catch(reason => {
        responseUtil.errorResponse(res, req.params.id, reason);
      });
  };

  this.getDados = (req, res) => {
    service
      .getDados(req.params.loteria, req.params.id)
      .then(value => {
        responseUtil.okResponse(res, req.params.id, value);
        return true;
      })
      .catch(reason => {
        responseUtil.errorResponse(res, req.params.id, reason);
      });
  };
  return this;
};
