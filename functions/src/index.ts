import * as functions from "firebase-functions";
import axios from "axios";
import generateToken from "./helper/generateTokens";

export const addNewUser = functions.auth.user().onCreate((user) => {
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
