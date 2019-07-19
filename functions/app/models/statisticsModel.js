const admin = require("firebase-admin");
const db = admin.firestore();
const dbCollectionName = "statistics";
const modelHelper = require("../@common/models/modelHelper");

module.exports = () => {
  this.getStatistics = loteria =>
    modelHelper.getSingle(db.collection(dbCollectionName).doc(loteria));

  this.updateStatistics = (loteria, record) => {
    return new Promise(resolve => {
      db.collection(dbCollectionName)
        .doc(loteria)
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
    return {
      primeiroJogo: 0,
      ultimoJogo: 0,
      qtde: 0
    };
  };
  return this;
};
