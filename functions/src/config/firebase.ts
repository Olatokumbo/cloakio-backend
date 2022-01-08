import { initializeApp, credential } from "firebase-admin";

require("dotenv").config();

const params = {
  type: process.env.FIREBASE_type,
  projectId: process.env.FIREBASE_project_id,
  privateKeyId: process.env.FIREBASE_private_key_id,
  privateKey: process.env.FIREBASE_private_key!.replace(/\\n/gm, "\n"),
  clientEmail: process.env.FIREBASE_client_email,
  clientId: process.env.FIREBASE_client_id,
  authUri: process.env.FIREBASE_auth_uri,
  tokenUri: process.env.FIREBASE_token_uri,
  authProviderX509CertUrl: process.env.FIREBASE_auth_provider_x509_cert_url,
  clientC509CertUrl: process.env.FIREBASE_client_x509_cert_url,
};

const admin = initializeApp({
  credential: credential.cert(params),
});

export default admin;
