import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCX5rA38nQrKwAdkbZMh_Qsm-2q3BtwwzA",
    authDomain: "dog-bnb-5372f.firebaseapp.com",
    projectId: "dog-bnb-5372f",
    storageBucket: "dog-bnb-5372f.appspot.com",
    messagingSenderId: "628495076594",
    appId: "1:628495076594:web:1d004e94fd50f9a165d46b"
  };

  const initializeFirebase = () => {
    const app = initializeApp(firebaseConfig);
  }
  
  const logOut = async () => {
    await getAuth().signOut();
  }

export const DB = () => getFirestore(getApp());
export const InitializeFirebase = initializeFirebase;
export const GetCurrentUser = () => getAuth(getApp()).currentUser;
export const LogOut = logOut;