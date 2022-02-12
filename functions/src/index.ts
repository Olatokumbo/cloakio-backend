import * as functions from "firebase-functions";
import axios from "axios";
// import generateToken from "./helper/generateTokens";

export const newUser = functions.auth.user().onCreate((user) => {
  // return generateToken(user.uid).then((token) => {
  //   console.log(token);
  return axios
    .post(
      "https://cloakio.herokuapp.com/user/new",
      {
        ...user,
        displayName: user.email?.split("@")[0],
      }
      // {
      //   headers: { Authorization: `Bearer ${token}` },
      // }
    )
    .then((response) => {
      functions.logger.debug(response.data);
    })
    .catch((err) => {
      functions.logger.info(user);
      functions.logger.error(err.message);
    });
  // });
});
