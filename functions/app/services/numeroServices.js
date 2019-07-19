const numeroModel = require("../models/numeroModel")();
const numeroDadosModel = require("../models/numeroDadosModel")();

module.exports = () => {
  this.getAll = loteria => numeroModel.getAll(loteria);

  this.getSingle = (loteria, numero) => numeroModel.getSingle(loteria, numero);

  this.getDados = (loteria, sequencia) =>
    numeroDadosModel.getSingle(loteria, sequencia);
  return this;
};
