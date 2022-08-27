import { components } from './views/components.js';

export const changeView = (route) => {
  const container = document.querySelector('body');
  container.innerHTML = '';
  switch (route) {
    case '': {
      components.firstView();
      components.firstViewBehavior();
      break; }
    case '#/sign-up': { container.appendChild(components.signUpView());
      components.signUpBehavior();
      break;
    }
    case '#/log-in': { components.loginView();
      components.logInBehavior();
      break;
    }
    case '#/home': { container.appendChild(components.homeView());
      components.homeBehavior();
      break;
    }
    case '#/profile': { container.appendChild(components.postView());
      components.postBehavior();
      break;
    }
    default: { components.loginView();
      break;
    }
  }
};
