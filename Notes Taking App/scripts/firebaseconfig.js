  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyABlyEQ6xfFCSSrOjRclvK1NFWpsaCxlHg",
    authDomain: "notes-taking-app-12f8e.firebaseapp.com",
    projectId: "notes-taking-app-12f8e",
    storageBucket: "notes-taking-app-12f8e.appspot.com",
    messagingSenderId: "417226597606",
    appId: "1:417226597606:web:06f7a90a3efb4ef6bac727",
    measurementId: "G-3VVHVL9FKQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export default app;

