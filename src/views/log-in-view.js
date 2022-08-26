import { enterWithEmail } from '../lib/index.js';
// import { signUpWithGmail } from '../firebase/firebaseConfig.js';

export const createLoginView = () => {
  const viewLogin = `
  <div class="containerForm">
    <div class="view">
      <div class='logo'>tripster</div>
      <br>
      <form>
        <input type="email" placeholder="Email" id="userEmail" class="emailPassword" value="" class='emailPassword'>
        <br>
        <input type="password" placeholder="Contraseña" id="password" class="emailPassword" value="" class='emailPassword'>
        <br>
        <button type="button" id="submitLogIn" class="buttonsForm">Log In</button>
      </form>
      <div id='eMessage'></div>
        <p class='complementaryTexts'>o</p>
        <button type="button" id="gmailLogIn" class="gmail"><img src='./images/logo-google-png.png' class='googleImage'>Continuar con Google</button>
        <br><br>
        <h3 class='complementaryTexts'>Si no tienes cuenta, crea una <span><a href="#/sign-up" class='bolderText'>aquí</a></span></h3>
    </div>
    </div>
  </div> 
  
  <section class ='modal'>
  <div class='modal_container'>
    <h2 class='modal_title>The Social Food</h2>
    <p class='modal_text'>Email no verificado</p> 
    <button type='button' class='modal_close'>OK</button>
  </div>
</section>`;

  const divElement = document.createElement('div');
  divElement.setAttribute('class', 'secondView');
  divElement.innerHTML = viewLogin;
  const printInBody = document.querySelector('body');
  printInBody.appendChild(divElement);
};

export const createBehaviorLoginView = () => {
  const userEmail = document.querySelector('#userEmail');
  const userPassword = document.querySelector('#password');
  const submitButton = document.querySelector('#submitLogIn');
  const eMessage = document.querySelector('#eMessage');
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('.modal_close');
  // const gmailButton = document.querySelectorAll('.gmailLogIn');

  submitButton.addEventListener('click', () => {
    enterWithEmail(userEmail.value, userPassword.value).then((result) => {
      const userCredential = result.user;
      if (userCredential.emailVerified === false) {
        modal.classList.add('modalShow');
        // eslint-disable-next-line no-alert
      } else {
        window.location.href = '#/home';
      }
    })
      .catch((error) => {
      // Debe imprimir el mensaje de error en el html
        const errorM = error.message;
        eMessage.setAttribute('class', 'errorMessage');
        // eslint-disable-next-line no-console
        console.log(errorM);
        switch (errorM) {
          case 'Firebase: Error (auth/invalid-email).': {
            eMessage.textContent = 'Debe ingresar un correo electrónico válido';
            break;
          }
          case 'Firebase: Error (auth/wrong-password).': {
            eMessage.textContent = 'Ingresar contraseña válida';
            break;
          }
          case 'Firebase: Error (auth/internal-error).': {
            eMessage.textContent = 'Completa todos los campos';
            break;
          }
          default:
            errorM.textContent = '';
            break;
        }
      });
  });
  modalClose.addEventListener('click', () => {
    modal.classList.remove('modalShow');
  });
};
