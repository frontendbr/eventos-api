var admin = require("firebase-admin");

module.exports = ({ config }) => {
  const serviceAccount = require(config.serviceAccountAdminPath);
  const databaseURL = "https://frontend-br-eventos.firebaseio.com";

  const  { FIREBASE_ADMIN_LOAD_TYPE, 
           FIREBASE_ADMIN_PROJECT_ID, 
           FIREBASE_ADMIN_CLIENT_EMAIL, 
           FIREBASE_ADMIN_PRIVATE_KEY } = process.env;
  
  if(FIREBASE_ADMIN_LOAD_TYPE === 'SECRET') {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: FIREBASE_ADMIN_PRIVATE_KEY
      }),
      databaseURL
    });    
  } else {
    if (serviceAccount.type) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL
      });
  
  }

    return admin;
  }

  return {};
}
