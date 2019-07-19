const sequenciaModel = require("../models/sequenciaModel")();
const sequenciaDadosModel = require("../models/sequenciaDadosModel")();

module.exports = () => {
  this.getAll = loteria => sequenciaModel.getAll(loteria);

  this.getSingle = (loteria, sequencia) =>
    sequenciaModel.getSingle(loteria, sequencia);

  this.getDados = (loteria, sequencia) =>
    sequenciaDadosModel.getSingle(loteria, sequencia);
  return this;
};
