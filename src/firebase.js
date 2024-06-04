import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2kw2mNZfeKpnfn7PXkyYyxioX6O6jx6o",
    authDomain: "el-mamon-548e5.firebaseapp.com",
    projectId: "el-mamon-548e5",
    storageBucket: "el-mamon-548e5.appspot.com",
    messagingSenderId: "848995035890",
    appId: "1:848995035890:web:997aba17801c07a3e7be6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };