const admin = require("firebase-admin");
const db = admin.firestore();
const modelHelper = require("../@common/models/modelHelper");

module.exports = () => {
  this.getAll = loteria =>
    modelHelper.getList(db.collection(`numero_${loteria}_dados`).orderBy("id"));

  this.getSingle = (loteria, numero) =>
    modelHelper.getSingle(db.collection(`numero_${loteria}_dados`).doc(numero));

  this.update = (loteria, numero, record) => {
    return new Promise(resolve => {
      db.collection(`numero_${loteria}_dados`)
        .doc(numero)
        .set(record)
        .then(() => {
          resolve({ sucesso: true, alreadyExists: false });
          return { sucesso: true, alreadyExists: false };
        })
        .catch(reason => {
          console.error(
            `Erro ao adicionar ou atualizar o registro ${reason}`,
            reason
          );
          reject(reason);
        });
      return true;
    });
  };

  this.getEmptyRecord = () => {
    const numeros = [];
    for (var i = 0; i < 25; i++) {
      numeros.push({ id: i + 1, qtde: 0, jogos: [], percentual: 0.0 });
    }
    return numeros;
  };
  return this;
};
