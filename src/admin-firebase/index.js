var admin = require("firebase-admin");

module.exports = ({ config }) => {
  const databaseURL = "https://frontend-br-eventos.firebaseio.com";

  const FIREBASE_ADMIN_LOAD_TYPE = process.env.FIREBASE_ADMIN_LOAD_TYPE;
  const FIREBASE_ADMIN_PROJECT_ID = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const FIREBASE_ADMIN_CLIENT_EMAIL = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const FIREBASE_ADMIN_PRIVATE_KEY = process.env. FIREBASE_ADMIN_PRIVATE_KEY;
  
  if(FIREBASE_ADMIN_LOAD_TYPE === 'SECRET') {
    console.warn("Firebase Admin - Secret mode")
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: FIREBASE_ADMIN_PRIVATE_KEY
      }),
      databaseURL
    });    
  } else {
    console.warn("Firebase Admin - File mode")
    const serviceAccount = require(config.serviceAccountAdminPath);
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
