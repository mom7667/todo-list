import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXB5wT0hAGOATKllw-fmhHgdAptnI-KLM",
  authDomain: "todolist-4d79a.firebaseapp.com",
  projectId: "todolist-4d79a",
  storageBucket: "todolist-4d79a.firebasestorage.app",
  messagingSenderId: "89781914451",
  appId: "1:89781914451:web:8df5524bfdcbbe86eb6fa6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 