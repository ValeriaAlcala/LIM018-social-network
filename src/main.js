// Este es el punto de entrada de tu aplicacion
import { changeView } from './controller.js';

const insertWindowView = () => window.addEventListener('hashchange', () => changeView(window.location.hash));
window.addEventListener('load', insertWindowView);

changeView(window.location.hash);
