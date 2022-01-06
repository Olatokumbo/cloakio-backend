import admin from "../config/firebase";

const uid = "Cloakio-Admin";

const generateToken = () => {
  admin
    .auth()
    .createCustomToken(uid)
    .then((customToken) => {
      return customToken;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export default generateToken;
