// firebase App (the core FIREBASE SDK) is always required and must be listed first
import * as firebase from 'firebase/app';
// import { env } from './env.js';

// Add the firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  // apiKey: env.FIREBASE_API_KEY,
  // authDomain: env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: env.FIREBASE_DATABASE_URL,
  // projectId: env.FIREBASE_PROJECT_ID,
  // storageBucket: env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: env.FIREBASE_APP_ID,
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    firebase.auth().updateCurrentUser(user);
  }
});
