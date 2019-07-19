const responseUtil = require("../@common/responseUtil");
const service = require("../services/lotofacilServices")();
module.exports = function() {
  this.getList = (req, res) => {
    var initialRecord = req.query.initialRecord;
    var recordCount = req.query.recordCount;
    var initialId = req.query.initialId;
    var finalId = req.query.finalId;
    if (initialRecord) {
      if (isNaN(initialRecord)) {
        responseUtil.errorResponse(res, null, "Initial record is not a number");
        return;
      }
      initialRecord = Number.parseInt(initialRecord);
    }
    if (recordCount) {
      if (isNaN(recordCount)) {
        responseUtil.errorResponse(res, null, "Record count is not a number");
        return;
      }
      recordCount = Number.parseInt(recordCount);
    }
    if (initialId) {
      if (isNaN(initialId)) {
        responseUtil.errorResponse(res, null, "InitialId is not a number");
        return;
      }
      initialId = Number.parseInt(initialId);
    }
    if (finalId) {
      if (isNaN(finalId)) {
        responseUtil.errorResponse(res, null, "FinalId is not a number");
        return;
      }
      finalId = Number.parseInt(finalId);
    }

    service
      .getList(initialRecord, recordCount, initialId, finalId)
      .then(value => {
        responseUtil.okResponse(res, null, value);
        return true;
      })
      .catch(reason => {
        responseUtil.errorResponse(res, null, reason);
      });
  };

  this.getSingle = (req, res) => {
    service
      .getSingle(req.params.id)
      .then(value => {
        responseUtil.okResponse(res, req.params.id, value);
        return true;
      })
      .catch(reason => {
        console.error(reason);
        responseUtil.errorResponse(res, req.params.id, reason);
      });
  };

  this.uploadFile = (req, res) => {
    service
      .processFile(req.body)
      .then(value => {
        responseUtil.okResponse(res, null, value);
        return true;
      })
      .catch(reason => {
        responseUtil.errorResponse(res, null, reason);
      });
  };

  this.getInfo = (req, res) => {
    service
      .getInfo()
      .then(value => {
        responseUtil.okResponse(res, null, value);
        return true;
      })
      .catch(reason => {
        responseUtil.errorResponse(res, null, reason);
      });
  };

  this.updateStatistics = (req, res) => {
    service
      .updateStatistics(req.query.refresh)
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
