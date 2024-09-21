// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmwUVDvvTjfM6svPIKmRu-0IMAmhIw564",
  authDomain: "daeguhackathon-62d3b.firebaseapp.com",
  projectId: "daeguhackathon-62d3b",
  storageBucket: "daeguhackathon-62d3b.appspot.com",
  messagingSenderId: "1014216071106",
  appId: "1:1014216071106:web:5c6ed500de8247570c685b",
  measurementId: "G-GZ419CVTQB",
  databaseURL: 'https://daeguhackathon-62d3b-default-rtdb.asia-southeast1.firebasedatabase.app'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);

export default app;