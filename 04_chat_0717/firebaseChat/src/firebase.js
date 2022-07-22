// //Firebase ver9 compliant (modular)
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseApp = initializeApp({
//   apiKey: import.meta.env.REACT_APP_FIREBASE_APIKEY,
//   authDomain: import.meta.env.REACT_APP_FIREBASE_DOMAIN,
//   //   databaseURL: import.meta.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: import.meta.env.REACT_APP_FIREBASE_APP_ID,
// });

// //Firebase ver9 compliant (modular)
// export const auth = getAuth(firebaseApp);
// export const db = getFirestore(firebaseApp);


//Firebase ver9 compliant (modular)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
});

//Firebase ver9 compliant (modular)
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);