import admin from "../config/firebase";

const uid = "Cloakio-Admin";

const generateToken = () => {
  return admin.auth().createCustomToken(uid);
};

export default generateToken;
