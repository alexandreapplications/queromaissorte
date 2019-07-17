const exceptionUtil = require("../@common/exceptionsUtil");
module.exports = () => {
  const admin = require("firebase-admin");
  const db = admin.firestore();
  const dbCollectionName = "lotofacil";
  this.addRecord = record => {
    return new Promise((resolve, reject) => {
      db.collection(dbCollectionName)
        .doc(record.id.toString())
        .set(record)
        .then(() => {
          resolve({ sucesso: true, alreadyExists: false });
          return { sucesso: true, alreadyExists: false };
        })
        .catch(reason => {
          console.error(`Erro ao adicionar o registro ${reason}`, reason);
          reject(reason);
        });
      return true;
    });
  };
  function getCollection(initialRecord, recordCount, initialId, finalId) {
    try {
      var collection = db.collection(dbCollectionName).orderBy("id");
      if (initialId) collection = collection.where("id", ">=", initialId);
      if (finalId) collection = collection.where("id", "<=", finalId);

      if (initialRecord && recordCount) {
        return collection.offset(initialRecord).limit(recordCount);
      }
      if (initialRecord) {
        return collection.offset(initialRecord);
      }
      if (recordCount) {
        return collection.limit(recordCount);
      }
      return collection;
    } catch (error) {
      console.error(`Erro creating collection ${error}`);
      throw error;
    }
  }
  this.getList = (initialRecord, recordCount, initialId, finalId) => {
    return new Promise((resolve, reject) => {
      var collection = getCollection(
        initialRecord,
        recordCount,
        initialId,
        finalId
      );
      collection
        .get()
        .then(snapshot => {
          var result = [];
          snapshot.forEach(record => {
            result.push(record.data());
          });
          resolve(result);
          return result;
        })
        .catch(reason => {
          reject(reason);
        });
    });
  };
  this.getSingle = id => {
    return new Promise((resolve, reject) => {
      db.collection(dbCollectionName)
        .doc(id)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            resolve(snapshot.data());
            return snapshot.data();
          } else {
            reject(exceptionUtil.RECORDNOTFOUND);
            return exceptionUtil.RECORDNOTFOUND;
          }
        })
        .catch(reason => {
          reject(reason);
        });
    });
  };
  this.getInfo = () => {
    return new Promise((resolve, reject) => {
      var collection = db.collection(dbCollectionName);
      var firstPromise = collection
        .orderBy("id", "asc")
        .limit(1)
        .select("id")
        .get();
      var lastPromise = collection
        .orderBy("id", "desc")
        .limit(1)
        .select("id")
        .get();
      Promise.all([firstPromise, lastPromise])
        .then(result => {
          var first = 0;
          var last = 0;
          result[0].forEach(value => {
            first = value.data().id;
          });
          result[1].forEach(value => {
            last = value.data().id;
          });
          response = {
            first,
            last
          };
          resolve(response);
          return response;
        })
        .catch(reason => {
          console.error(`Erro ao executar a promise ${reason}`);
          reject(reason);
        });
    });
  };
  return this;
};
