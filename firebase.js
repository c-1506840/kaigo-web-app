
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBG30wR77-eriJRen4fZpZSc9Ku98Jpuns",
  authDomain: "kaigo-web-app.firebaseapp.com",
  projectId: "kaigo-web-app",
  storageBucket: "kaigo-web-app.firebasestorage.app",
  messagingSenderId: "804682169102",
  appId: "1:804682169102:web:7f16a9d136199213e7755f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// ログイン認証
const auth = getAuth(app);

// 他のJavaScriptファイルで使用できるようにする
export { db, auth };
