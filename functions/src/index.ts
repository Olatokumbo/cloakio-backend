import * as functions from "firebase-functions";
import axios from "axios";
import generateToken from "./helper/generateTokens";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const newUser = functions.auth.user().onCreate((user) => {
  axios
    .post(
      "http://localhost:8000/user/new",
      {
        ...user,
      },
      {
        headers: { Authorization: `Bearer ${generateToken()}` },
      }
    )
    .then((response) => {
      functions.logger.debug(response.data);
    })
    .catch((err) => {
      functions.logger.error(err);
    });
});
