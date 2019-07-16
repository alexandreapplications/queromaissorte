var Lotofacil = require("./app/import/lotofacil");
var LotoFacilDb = require("./app/merge/lotofacildb");
var fs = require("fs");

fs.readFile("data/d_lotfac.htm", "utf8", function(err, contents) {
  const lotofacil = new Lotofacil();
  linhas = lotofacil.getInfoLotofacil(contents);
  const lotoFacilDb = new LotoFacilDb();
  linhas.forEach(element => {
    console.log(`Incluindo id: ${element.id}`);
    lotoFacilDb.insert(element);
  });
});
