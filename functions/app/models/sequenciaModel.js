const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = () => {
  this.getAll = loteria => {
    return new Promise((resolve, reject) => {
      db.collection(`sequencia_${loteria}`)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            resolve(snapshot.data());
            return snapshot.data();
          } else {
            resolve(null);
            return null;
          }
        })
        .catch(reason => {
          console.error(reason);
          reject(reason);
        });
    });
  };

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
