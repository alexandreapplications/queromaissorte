const functions = require("firebase-functions");

const cors = require("cors");

var admin = require("firebase-admin");

var serviceAccount = require("./keys/queromaissorte-firebase-adminsdk-t7t1i-e61870831e.json");

// [START setup firebase]
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://queromaissorte.firebaseio.com"
});
// [END setup firebase]

const lotofacilRouter = require("./app/routes/lotofacilRouter");

const express = require("express");

function setupRoute(route) {
  const app = express();
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:8080",
        "https://queromaissorte.firebaseapp.com"
      ]
    })
  );
  app.use("/", route);
  return app;
}

exports.lotofacil = functions.https.onRequest(setupRoute(lotofacilRouter));
