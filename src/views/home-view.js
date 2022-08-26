import {
    createPost,
    onGetPost,
    deletePost,
    onePost,
    auth,
    // updatePost,
    currentUser,
    // allPost,
  } from '../firebase/firebaseConfig.js';
  
  export const createHomeView = () => {
    const viewHome = `
  
      <header>
        <img src='./images/logo-tripster.png' class='principal-logo'> 
        <div class='logoText'>tripster</div>
      </header>
  
      <section class='post-Content'>
  
        <div class='conteinerPost'>
          <div class='userPost'>
              <div class='userImage'>
                <img src='./images/user-line-white.png' class='icon'>
              </div>
              <input type='text' id='userPostCreate' class='inputPost' placeholder='Vamos, ¡pon algo!'>
          </div>
        </div>
  
        <div class='buttonPde'>
          <button  id='publish-Button' class='publish-Button'>Publicar</button> 
        </div>
  
      </section> 
  
      <div class='postContainer'></div>
  
      <div class="tab-menu">
        <ul class="tab-menu-list">
          <li class="tab-menu-item tab-menu-active">
            <span class='tab-menu-icon'><img src='./images/home-line.png'></span>
            <span class='tab-menu-text'>Inicio</span>
          </li>
  
          <li class="tab-menu-item">
            <span class='tab-menu-icon'><img src='./images/user-line.png'></span>
            <span class='tab-menu-text'>Mi cuenta</span>
          </li>
        </ul>
      </div>`;
    const newSection = document.createElement('section');
    newSection.setAttribute('class', 'homeSection');
    newSection.innerHTML = viewHome;
    return newSection;
  };
  
  export const createBehaviorHomeView = () => {
    // const postContainer = document.querySelector('.post-Content');
    const buttonPost = document.querySelector('.publish-Button');
    const userPostInfo = document.querySelector('#userPostCreate');
    const publications = document.querySelector('.postContainer');
    const menuItems = document.querySelectorAll('.tab-menu-item');
  
    // MANDANDO POSTS A FIRESTORE
    buttonPost.addEventListener('click', () => {
      createPost({
        postContent: userPostInfo.value,
        dateCreated: new Date().toLocaleString(),
        userName: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
      });
    });
  
    // BARRA ESTATICA
    const previousSelectItems = menuItems[0];
    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        previousSelectItems.classList.remove('item-menu-active');
        // previousSelectItems = item;
        // item.classList.add('tab-menu-active');
      });
    });
  
    onGetPost((querySnapshot) => {
      let htmlNewText = '';
      querySnapshot.forEach((postsDoc) => {
        // TODOS LOS POST DE FIRESTORE
        const generalPosts = postsDoc.data();
        const enteringTheCollection = generalPosts.contenidoPost;
        const currentuser = currentUser();
  
        htmlNewText += `
                  <div class = 'allPostsContainer'>
  
                    <div class='individualPosts'>
  
                      <div class = 'first-section-posts'>
                        <div class = 'imageProfile'>
                          <div class = 'UserNamer'> ${enteringTheCollection.userName} </div>
                          <div class = 'dateCreatedP dataid='${postsDoc.id}'> ${enteringTheCollection.dateCreated} </div>
                        </div>  
                       
                        ${currentuser.uid === enteringTheCollection.userId ? `
  
                        <div class='menuOptions'>  
                          <button class='btn-seeMore'>
                            <img src='./images/more-line.png'
                          </button>
  
                          <ul id ='post-options-menu' class = 'post-options-menu'>
  
                            <div class = 'deleteOption'>
                              <img src='./images/delete-bin-line.png' class='icon'> </img>
                              <li class= 'post-menu-item' id= 'deleteSection' data-id='${postsDoc.id}'> Eliminar</li>
                            </div>
  
                            <br>
  
                            <div class = 'editOption'>
                              <img src='./images/edit-box-line.png' class='icon'> </img>
                              <li class= 'post-menu-item editPost' id= 'editPost' data-id='${postsDoc.id}'>Editar</li>
                            </div>
                          </ul>
  
                        </div>
  
                      </div> ` : ''}
  
                      <imput type='text' class= 'textPost' disabled="true" id='${postsDoc.id}'> ${enteringTheCollection.postContent}
                  
                    </div>
  
                    <div class= 'interactions'>
                      <img src='./images/heart-3-line.png' class= 'interactionsbuttons'>
                      <img src='./images/chat-1-line.png' class= 'interactionsbuttons'>
                    </div>
  
                  </div>`;
  
        publications.innerHTML = htmlNewText;
        const textPost = document.querySelector('.textPost');
  
        // // MENU PARA TEDITAR O ELIMAR EL POST
        // const menusDesplegables = document.querySelectorAll('.btn-seeMore');
        // menusDesplegables.forEach((editbtnMenu) => {
        //   console.log(editbtnMenu);
        //   editbtnMenu.addEventListener('click', (event) => {
        //     const btnMenu = event.target.closest('.menuOptions').querySelector
        // ('.post-options-menu'); // btns edit,delete
        //     if (btnMenu.classList.contains('show-Menu')) { // class show.menu
        //       btnMenu.classList.remove('show-Menu');
        //     } else {
        //       btnMenu.classList.add('show-Menu');
        //     }
        //   });
        // });
  
        // ELIMINAR POST DE FIRESTORE
        const deleteBtn = publications.querySelectorAll('#deleteSection');
        deleteBtn.forEach((button) => {
          button.addEventListener('click', (e) => {
            deletePost(e.target.dataset.id);
            console.log(e.target.dataset.id);
          });
        });
  
        // EDITANDO EL POST
        const editBtn = publications.querySelectorAll('#editPost');
        editBtn.forEach((btn) => {
          console.log(btn);
          btn.addEventListener('click', async (e) => {
            const docId = await onePost(e.target.dataset.id);
            // const infoPost = docId.data();
  
            publications[textPost].value = enteringTheCollection.postContent;
          });
        });
  
        // const taskForm = document.querySelector('individualPosts');
        // const btnsEdit = document.querySelectorAll('.editPost');
        // btnsEdit.forEach((btn) => {
        //   btn.addEventListener('click', async (e) => {
        //     document.querySelector('.textPost').disabled = false;
        //     try {
        //       const doc = await allPost(e.target.dataset.id);
        //       const docData = doc.data();
        //       taskForm['task-title'].value = docData.title;
        //       editStatus = true;
        //       id = doc.id;
        //       taskForm['btn-task-form'].innerText = 'Update';
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   });
        // });
      });
    });
  };
  