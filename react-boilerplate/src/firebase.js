import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJbwAtTeAQa43iXjOQFifT4ZB_UNipKm4",
  authDomain: "react-cadastro-feh.firebaseapp.com",
  projectId: "react-cadastro-feh",
  storageBucket: "react-cadastro-feh.firebasestorage.app",
  messagingSenderId: "224908368769",
  appId: "1:224908368769:web:897f31f6dde2c31bf12680",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);