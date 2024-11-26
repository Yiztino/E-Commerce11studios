import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  
const firebaseConfig = {
  apiKey: "AIzaSyBStCxZP1YyDB0_suj6VsxUQ8BB4Z_xDyU",
  authDomain: "e-commerce-4ca92.firebaseapp.com",
  projectId: "e-commerce-4ca92",
  storageBucket: "e-commerce-4ca92.firebasestorage.app",
  messagingSenderId: "1041144058761",
  appId: "1:1041144058761:web:98389c4c5d1dd905b44758",
  measurementId: "G-NXM9H8JL0R"
};


export const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
