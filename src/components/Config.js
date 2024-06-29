import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBsNze9h4qw50zh2LON03mIOgw8nlmMQDU",
  authDomain: "dogbnb-ccb7b.firebaseapp.com",
  projectId: "dogbnb-ccb7b",
  storageBucket: "dogbnb-ccb7b.appspot.com",
  messagingSenderId: "803586230912",
  appId: "1:803586230912:web:f415a4d750b1f17c7a3465",
  measurementId: "G-MVQZ578XXW"
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