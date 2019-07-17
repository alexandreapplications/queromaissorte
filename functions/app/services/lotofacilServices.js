const cheerio = require("cheerio");
const moment = require("moment");
const lotoFacilModel = require("../models/lotofacilModel")();

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
      const regexValue = /\d+/g;
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
                      "dd/MM/yyyy"
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
          // var alreadyExists = 0;
          // var inserted = 0;
          // result.forEach(element => {
          //   if (element.alreadyExists) alreadyExists++;
          //   else inserted++;
          // });
          // resolve({ success: true, inserted, alreadyExists });
          resolve({ success: true });
          return true;
        })
        .catch(reason => {
          console.log(reason);
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
  return this;
};
