var admin = require("firebase-admin");

module.exports = ({ config }) => {
  const serviceAccount = require(config.serviceAccountAdminPath);
  const databaseURL = "https://frontend-br-eventos.firebaseio.com";
  
  if (serviceAccount.type) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL
    });


    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: "<PROJECT_ID>",
        clientEmail: "foo@<PROJECT_ID>.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\n<KEY>\n-----END PRIVATE KEY-----\n"
      }),
      databaseURL
    });

    return admin;
  }

  return {};
}
