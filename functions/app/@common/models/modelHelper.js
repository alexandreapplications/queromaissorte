exports.getList = collection =>
  new Promise((resolve, reject) => {
    collection
      .get()
      .then(snapshot => {
        var result = [];
        snapshot.forEach(snapshot => result.push(snapshot.data()));
        resolve(result);
        return result;
      })
      .catch(reason => {
        console.error(reason);
        reject(reason);
      });
  });

exports.getSingle = collection =>
  new Promise((resolve, reject) => {
    collection
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
