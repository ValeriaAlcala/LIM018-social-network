export const createFirstView = () => {
  const firstView = `
        <div class = 'firstView-Container'>
          <div class = 'titles-FirstView'>
            <div class ='text-Titles'>Explora.</div>
            <br>
            <br>
            <div class ='text-Titles'>Viaja.</div>
            <br>
            <br>
            <div class ='text-Titles'>Inspira.</div>
          </div>    
          <button type ="button" id="firstViewButton" class="firstViewButton">Encuentra tu proximo viaje</button>
        </div>
        `;

  const divElement = document.createElement('div');
  divElement.innerHTML = firstView;
  divElement.setAttribute('class', 'firstView');
  const printInBody = document.querySelector('body');
  printInBody.appendChild(divElement);
};

export const createBehaviorFirstView = () => {
  const buttonFirstPage = document.querySelector('#firstViewButton');

  buttonFirstPage.addEventListener('click', () => {
    window.location.href = '#/log-in';
  });
};
