// aqui exportaras las funciones que necesites
import { signUpWithEmail, logInWithEmail } from '../firebase/firebaseConfig.js';

export const registerWithEmail = (email, password) => signUpWithEmail(email, password);

export const enterWithEmail = (email, password) => logInWithEmail(email, password);
