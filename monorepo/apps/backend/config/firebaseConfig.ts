import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator  } from "firebase/auth";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };;
import admin, { ServiceAccount } from 'firebase-admin';
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyAWNKJMQI8JfQM_L8bk1aRoSMRuUexDP9g",
  authDomain: "backend-repo-d9923.firebaseapp.com",
  projectId: "backend-repo-d9923",
  storageBucket: "backend-repo-d9923.firebasestorage.app",
  messagingSenderId: "995709005505",
  appId: "1:995709005505:web:023db10f1c590a704cae40"
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = admin.auth();
const userAuth = getAuth(app);

export {db, auth, userAuth}