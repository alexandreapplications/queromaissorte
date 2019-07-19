const admin = require("firebase-admin");
const db = admin.firestore();
const modelHelper = require("../@common/models/modelHelper");

module.exports = () => {
  this.getAll = loteria =>
    modelHelper.getList(db.collection(`sequencia_${loteria}`));

  this.getSingle = (loteria, sequencia) =>
    modelHelper.getSingle(db.collection(`sequencia_${loteria}`).doc(sequencia));

  this.update = (loteria, sequencia, record) => {
    return new Promise(resolve => {
      db.collection(`sequencia_${loteria}`)
        .doc(sequencia)
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
  return this;
};
