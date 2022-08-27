/* eslint-disable max-len */
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
  //signInWithRedirect,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  // eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyA0wB63vDtsv0glO6wfBULLeh04SOaM9sk',
  authDomain: '"seeworld-11c63.firebaseapp.com"',
  projectId: 'seeworld-11c63',
  storageBucket: 'seeworld-11c63.appspot.com',
  messagingSenderId: '778033784367',
  appId: '1:778033784367:web:b6fc9c9981ef4f1cb9c8da',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export {GoogleAuthProvider};
// eslint-disable-next-line max-len

export const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const logInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signUpWithGmail = () => { return signInWithPopup(auth, provider) };

export const emailVerification = () => sendEmailVerification(auth.currentUser);

export const dataBase = getFirestore(app);

const postCollection = collection(dataBase, 'posts');

// Mandar el contenido del post a Firestore
export const createPost = (text) => addDoc(postCollection, { contenidoPost: text });

export const allPost = () => getDocs(postCollection);

export const currentUser = () => auth.currentUser;

// TODOS LOS DOCS HASTA EL MOMENTO
export const onGetPost = (everySinglePost) => onSnapshot((postCollection), everySinglePost);

// ELIMINAR DESDE FIRESTORE
export const deletePost = (id) => deleteDoc(doc(dataBase, 'posts', id));

export const onePost = (id) => getDoc(doc(dataBase, 'posts', id));

// EDITAR POST
export const updatePost = (id) => updateDoc(doc(dataBase, 'posts', id));

// EXTRAER EL DATO DEL USUARIO QUE INICIO SESION
export const updateDisplayyName = (name) => {
  updateProfile(
    auth.currentUser,
    {
      displayName: name,
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    },
  );
};