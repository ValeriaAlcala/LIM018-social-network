export const createProfileView = () => {
  const profileView = `
        <div class = 'create-post-Container'>

        <header></header>
 
          <div class="tab-menu">
            <ul class="tab-menu-list">
              <li class="tab-menu-item"  id='homeSection'>
                <span class='tab-menu-icon'><img src='./images/home-line.png'></span>
                <span class='tab-menu-text'>Inicio</span>
              </li>

              <li class="tab-menu-item tab-menu-active">
                <span class='tab-menu-icon'><img src='./images/user-line.png'></span>
                <span class='tab-menu-text'>Mi cuenta</span>
              </li>
            </ul>
          </div> 

        </div>`;

  const profileElement = document.createElement('section');
  profileElement.setAttribute('class', 'profileViewContainer');
  profileElement.innerHTML = profileView;
  return profileElement;
};

export const createBehaviorProfileView = () => {
  const homeSectionView = document.querySelector('#homeSection');

  homeSectionView.addEventListener('click', () => {
    window.location.href = '#/home';
  }); // window.location.href = '#/home';
};
