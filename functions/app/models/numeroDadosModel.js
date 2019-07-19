const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = () => {
  this.getAll = loteria => {
    return new Promise((resolve, reject) => {
      db.collection(`numero_${loteria}_dados`)
        .orderBy("id")
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
