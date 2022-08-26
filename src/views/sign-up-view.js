// eslint-disable-next-line import/no-unresolved
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { registerWithEmail } from '../lib/index.js';
import {
  dataBase, signUpWithGmail, emailVerification, updateDisplayyName,
} from '../firebase/firebaseConfig.js';

export const createSignUpView = () => {
  const viewSignup = `
  <div class='containerForm'>
    <div class='view'>
      <div class='logo'>tripster</div>
      <br>
        <form>
          <input type='text' placeholder='Nombre y apellido' id='userName' class="registerInputs">
          <br>
          <input type='email' placeholder='Correo electrónico' id='email' class="registerInputs">
          <br>
          <input type='password' placeholder='Contraseña' id='userPassword' value='' class="registerInputs">
          <br>
          <button type='button' id="submitLogIn" class="buttonsForm" value='Sign Up'>Sign Up</button>
        </form>
        <div id='eMessage'></div>
        <button type="button" id="gmailSignIn" class="gmail"><img src='./images/logo-google-png.png' class='googleImage'>Continuar con Google</button>
        <br><br>
        <h3 class='complementaryTexts'>¿Ya tienes una cuenta? <span><a href='#/log-in' class='bolderText'>Iniciar sesión</a></span></h3>
    </div>    
  </div>`;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'secondView');
  divElement.innerHTML = viewSignup;

  return divElement;
};

export const createBehaviorSignUpView = () => {
  const userEmail = document.querySelector('#email');
  const userPassword = document.querySelector('#userPassword');
  const eMessage = document.querySelector('#eMessage');
  const submitButton = document.querySelector('.buttonsForm');
  const gmailButton = document.querySelector('#gmailSignIn');
  const userName = document.querySelector('#userName');

  submitButton.addEventListener('click', () => {
    // eslint-disable-next-line no-console
    console.log('Hello Everybody');
    registerWithEmail(userEmail.value, userPassword.value)
      .then(async (result) => {
        emailVerification().then(() => {
          // eslint-disable-next-line no-alert
          window.location.href = '#/log-in';
        });
        const userCredential = result.user;
        updateDisplayyName(userName.value);
        try {
          // pasarle al objeto todos los campos que le estamos pidiendo (opcional)
          const docRef = await addDoc(collection(dataBase, 'users'), {
            email: userCredential.email,
            uid: userCredential.uid,
          });
          // eslint-disable-next-line no-console
          console.log('Document written with ID: ', docRef.id);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error adding document: ', e);
        }
      }).catch((error) => {
        const errorM = error.message;
        eMessage.setAttribute('class', 'errorMessage');
        // eslint-disable-next-line no-console
        console.log(errorM);
        switch (errorM) {
          case 'Firebase: Error (auth/invalid-email).': {
            eMessage.textContent = 'Debe ingresar un correo electrónico válido';
            break;
          }
          case 'Firebase: Password should be at least 6 characters (auth/weak-password).': {
            eMessage.textContent = 'La contraseña debe tener como mínimo 6 caracteres';
            break;
          }
          case 'Firebase: Error (auth/email-already-in-use).': {
            eMessage.textContent = 'El correo electrónico ya está siendo usado';
            break;
          }
          default: errorM.textContent = '';
            break;
        }
      });
  });

  gmailButton.addEventListener('click', () => {
    signUpWithGmail()
      .then((result) => {
      // eslint-disable-next-line no-console
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        // eslint-disable-next-line no-console
        console.log(user);
        // redireccionar y ruteo
        window.location.href = '#/log-in';
      }).catch((error) => {
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // eslint-disable-next-line no-console
        console.log(errorMessage, email);
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      });
  });

  // gmailButton.addEventListener('click', () => {
  //   signUpWithGmail()
  //     .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access Google APIs.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;

  //       // The signed-in user info.
  //       const user = result.user;
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // });
};
