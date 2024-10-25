import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA50buZYQIaMFqQRwhj-J-OqvLLvnM2b_s",
  authDomain: "uts-david-dewanto.firebaseapp.com",
  projectId: "uts-david-dewanto",
  storageBucket: "uts-david-dewanto.appspot.com",
  messagingSenderId: "1062084535351",
  appId: "1:1062084535351:web:f0f24d3b8c3b7ea2e84bb2",
  measurementId: "G-VDEJ575Y5C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);