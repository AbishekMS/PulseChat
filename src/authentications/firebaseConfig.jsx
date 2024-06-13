import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTEmhca5Z38NFfPXRPk2icVWHqniFVEFY",
  authDomain: "chat-b64f4.firebaseapp.com",
  projectId: "chat-b64f4",
  storageBucket: "chat-b64f4.appspot.com",
  messagingSenderId: "642426008882",
  appId: "1:642426008882:web:ef9aa723fb6edd318ed32b",
  measurementId: "G-PN48HMB20P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
export {db,auth};
export default app;