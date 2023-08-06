import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyBvgrTdw_BnHFUkav0S7cqEvqoYgeFnUYA",
    authDomain: "jaredezz-tech.firebaseapp.com",
    projectId: "jaredezz-tech",
    storageBucket: "jaredezz-tech.appspot.com",
    messagingSenderId: "922550709845",
    appId: "1:922550709845:web:befc8c86b419812e352edc",
    measurementId: "G-E45BRFYY57"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
