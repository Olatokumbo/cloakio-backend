import admin from "../config/firebase";

const generateToken = (uid: string) => {
  return admin.auth().createCustomToken(uid);
};

export default generateToken;
