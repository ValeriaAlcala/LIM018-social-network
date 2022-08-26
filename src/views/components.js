import { createLoginView, createBehaviorLoginView } from './log-in-view.js';
import { createSignUpView, createBehaviorSignUpView } from './sign-up-view.js';
import { createHomeView, createBehaviorHomeView } from './home-view.js';
import { createFirstView, createBehaviorFirstView } from './first-view.js';

const components = {
  firstView: createFirstView,
  firstViewBehavior: createBehaviorFirstView,
  signUpView: createSignUpView,
  signUpBehavior: createBehaviorSignUpView,
  loginView: createLoginView,
  logInBehavior: createBehaviorLoginView,
  homeView: createHomeView,
  homeBehavior: createBehaviorHomeView,
};

export { components };