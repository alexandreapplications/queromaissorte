const cheerio = require("cheerio");
const moment = require("moment");
const lotoFacilModel = require("../models/lotofacilModel")();
const statisticsModel = require("../models/statisticsModel")();
const sequenciaModel = require("../models/sequenciaModel")();
const numeroModel = require("../models/numeroModel")();
const sequenciaDadosModel = require("../models/sequenciaDadosModel")();
const numeroDadosModel = require("../models/numeroDadosModel")();
const LOTERIA = "lotofacil";
module.exports = () => {
  this.getKeys = () => {
    return lotoFacilModel.getList();
  };
  this.processFile = contents => {
    return new Promise((resolve, reject) => {
      var cabecalho = [
        { name: "id", type: "int" },
        { name: "data", type: "date" },
        { name: "1", type: "int" },
        { name: "2", type: "int" },
        { name: "3", type: "int" },
        { name: "4", type: "int" },
        { name: "5", type: "int" },
        { name: "6", type: "int" },
        { name: "7", type: "int" },
        { name: "8", type: "int" },
        { name: "9", type: "int" },
        { name: "10", type: "int" },
        { name: "11", type: "int" },
        { name: "12", type: "int" },
        { name: "13", type: "int" },
        { name: "14", type: "int" },
        { name: "15", type: "int" },
        { name: "arrecadacao_Total", type: "decimal" },
        { name: "ganhadores_15_Numeros", type: "int" },
        { name: "cidade", type: "text" },
        { name: "uF", type: "text" },
        { name: "ganhadores_14_Numeros", type: "int" },
        { name: "ganhadores_13_Numeros", type: "int" },
        { name: "ganhadores_12_Numeros", type: "int" },
        { name: "ganhadores_11_Numeros", type: "int" },
        { name: "valor_Rateio_15_Numeros", type: "decimal" },
        { name: "valor_Rateio_14_Numeros", type: "decimal" },
        { name: "valor_Rateio_13_Numeros", type: "decimal" },
        { name: "valor_Rateio_12_Numeros", type: "decimal" },
        { name: "valor_Rateio_11_Numeros", type: "decimal" },
        { name: "acumulado_15_Numeros", type: "decimal" },
        { name: "estimativa_Premio", type: "decimal" },
        { name: "valor_Acumulado_Especial", type: "decimal" }
      ];
      var dados = [];
      var numeros = [];
      var bolas = [];
      for (var i = 0; i < 25; i++) {
        numeros.push(false);
        if (i < 15) bolas.push(null);
      }
      const $ = cheerio.load(contents);
      $("tr").each((index, element) => {
        if (index > 0) {
          var tdElement = $("td", element);
          if (tdElement.length > 10) {
            record = new Object();
            record.numeros = numeros.slice();
            $(tdElement).each((indexBola, elementItem) => {
              var columnName = cabecalho[indexBola].name;
              var columnType = cabecalho[indexBola].type;
              var columnValue;
              try {
                switch (columnType) {
                  case "int":
                    columnValue = Number.parseInt($(elementItem).text());
                    break;
                  case "date":
                    columnValue = moment(
                      $(elementItem).text(),
                      "DD/MM/YYYY"
                    ).toDate();
                    break;
                  case "decimal":
                    columnValue = $(elementItem).text();
                    while (columnValue.indexOf(".") >= 0)
                      columnValue = columnValue.replace(".", "");
                    while (columnValue.indexOf(",") >= 0)
                      columnValue = columnValue.replace(",", ".");
                    columnValue = Number.parseFloat(columnValue);
                    break;
                  default:
                    columnValue = $(elementItem).text();
                    break;
                }
              } catch (error) {
                console.error(
                  `Erro converting column ${JSON.stringify(
                    cabecalho[indexBola]
                  )}`
                );
              }
              if (isNaN(columnName)) {
                record[columnName] = columnValue;
              } else {
                if (record.bolas === undefined) {
                  record.bolas = bolas.slice();
                }
                var bolaId = Number.parseInt(columnName) - 1;
                var valorSorteado = Number.parseInt($(elementItem).text());
                record.bolas[bolaId] = valorSorteado;
                record.numeros[valorSorteado - 1] = true;
              }
            });
            dados.push(record);
          }
        }
      });
      promises = dados.map(value => {
        return lotoFacilModel.addRecord(value);
      });
      Promise.all(promises)
        .then(result => {
          resolve({ success: true });
          return true;
        })
        .catch(reason => {
          console.error(reason);
          reject(reason);
        });
    });
  };

  this.getList = (initialRecord, recordCount, initialId, finalId) => {
    return lotoFacilModel.getList(
      initialRecord,
      recordCount,
      initialId,
      finalId
    );
  };

  this.getInfo = () => {
    return lotoFacilModel.getInfo();
  };

  this.getSingle = id => lotoFacilModel.getSingle(id);

  this.updateStatistics = refresh => {
    // Get current statistics
    return new Promise(async (resolve, reject) => {
      try {
        //#region Inicialização
        var statistics = refresh
          ? statisticsModel.getEmptyRecord()
          : (await statisticsModel.getStatistics(LOTERIA)) ||
            statisticsModel.getEmptyRecord();

        var listRecords = await lotoFacilModel.getList(
          null,
          null,
          statistics.ultimoJogo + 1,
          null
        );
        if (listRecords.length === 0) return true;

        var sequencias = refresh
          ? {}
          : (await sequenciaModel.getAll(LOTERIA)) || {};

        var numeros = refresh
          ? numeroModel.getEmptyRecord()
          : (await numeroModel.getAll(LOTERIA)) || numeroModel.getEmptyRecord();
        //# endregion

        //#region Processamento
        listRecords.forEach(element => {
          var sequencia = [];
          statistics.qtde++;
          element.numeros.forEach((value, indice) => {
            if (value) {
              numeros[indice].qtde++;
              numeros[indice].jogos.push(element.id);
              sequencia.push(indice + 1);
            } else {
              sequencias = tratarSequencia(sequencias, sequencia, element.id);
              sequencia = [];
            }
          });
          sequencias = tratarSequencia(sequencias, sequencia, element.id);
        });
        statistics.ultimoJogo = listRecords[listRecords.length - 1].id;
        //#endregion

        //#region Update Sequences
        var sequenciaUpdatePromises = [];
        for (value in sequencias) {
          const seqItem = sequencias[value];
          seqItem.percentual = (seqItem.qtde / statistics.qtde) * 100;
          sequenciaUpdatePromises.push(
            sequenciaDadosModel.update(LOTERIA, value, { jogos: seqItem.jogos })
          );
          delete seqItem.jogos;
          sequenciaUpdatePromises.push(
            sequenciaModel.update(LOTERIA, value, seqItem)
          );
        }
        await Promise.all(sequenciaUpdatePromises);
        //# endregion
        var numeroDadosUpdatePromises = numeros.map(value =>
          numeroDadosModel.update(LOTERIA, value.id.toString(), {
            jogos: value.jogos
          })
        );
        await Promise.all(numeroDadosUpdatePromises);

        var numeroUpdatePromises = numeros.map(value => {
          value.percentual = (value.qtde / statistics.qtde) * 100;
          delete value.jogos;
          return numeroModel.update(LOTERIA, value.id.toString(), value);
        });
        await Promise.all(numeroUpdatePromises);

        for (value in statistics.numeros) {
          statistics.numeros[value].percentual =
            (statistics.numeros[value].qtde / statistics.qtde) * 100;
        }
        if (statistics.primeiroJogo === 0) statistics.primeiroJogo = 1;
        var result = await statisticsModel.updateStatistics(
          LOTERIA,
          statistics
        );
        resolve(result);
        return result;
      } catch (error) {
        console.error(error);
        reject(error);
        return error;
      }

      function tratarSequencia(sequencias, sequencia, jogoId) {
        if (sequencia.length < 2) return sequencias;
        if (sequencias[sequencia] === undefined) {
          sequencias[sequencia] = {
            qtde: 1,
            jogos: [jogoId],
            percentual: 0.0
          };
        } else {
          sequencias[sequencia].qtde++;
          sequencias[sequencia].jogos.push(jogoId);
        }
        return sequencias;
      }
    });
  };

  return this;
};
