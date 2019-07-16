const cheerio = require("cheerio");
var accents = require("remove-accents");

module.exports = function() {
  this.getInfoLotofacil = function(contents) {
    var cabecalho = [
      "id",
      "data",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "arrecadacao_Total",
      "ganhadores_15_Numeros",
      "cidade",
      "uF",
      "ganhadores_14_Numeros",
      "ganhadores_13_Numeros",
      "ganhadores_12_Numeros",
      "ganhadores_11_Numeros",
      "valor_Rateio_15_Numeros",
      "valor_Rateio_14_Numeros",
      "valor_Rateio_13_Numeros",
      "valor_Rateio_12_Numeros",
      "valor_Rateio_11_Numeros",
      "acumulado_15_Numeros",
      "estimativa_Premio",
      "valor_Acumulado_Especial"
    ];
    var dados = [];
    var numeros = [];
    var bolas = [];
    for (var i = 0; i < 25; i++) {
      numeros.push(false);
      if (i < 15) bolas.push(null);
    }
    const $ = cheerio.load(contents);
    $("tr").each(function(index, element) {
      if (index > 0) {
        tdElement = $("td", element);
        if (tdElement.length > 10) {
          record = new Object();
          record.numeros = numeros.slice();
          $(tdElement).each(function(indexBola, elementItem) {
            var columnName = cabecalho[indexBola];
            if (isNaN(columnName)) {
              record[columnName] = $(elementItem).text();
            } else {
              if (record.bolas === undefined) {
                record.bolas = bolas.slice();
              }
              var bolaId = new Number(columnName) - 1;
              var valorSorteado = $(elementItem).text();
              record.bolas[bolaId] = valorSorteado;
              record.numeros[valorSorteado - 1] = true;
            }
          });
          dados.push(record);
        }
      }
    });
    return dados;
  };
  return this;
};
