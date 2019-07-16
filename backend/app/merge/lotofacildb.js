const fetch = require("node-fetch");
module.exports = function() {
  this.insert = dataRow => {
    const insertParameters = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataRow)
    };
    fetch("http://localhost:3000/lotofacil/", insertParameters)
      .then(response => ({ success: true, data: response }))
      .catch(reason => {
        console.error(reason);
      });
  };
};
