/* eslint-disable no-undef */
import Button from '../components/button.js';
import Input from '../components/input.js';
import Nav from '../components/nav.js';

const postColletion = firebase.firestore().collection('posts');

// function btnSignOut() {
//   firebase.auth().signOut().then(() => {
//     window.location = '#login';
//   });
// }

function btnPrint() {
  const content = document.querySelector('.txt-area').value;
  const filterPrivacy = document.getElementById('privacy').value;

  if (content !== null && content !== '') {
    const user = firebase.auth().currentUser;
    const post = {
      text: content,
      likes: 0,
      user_id: user.uid,
      user_name: user.displayName,
      comments: [],
      privacy: filterPrivacy,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    firebase.firestore().collection('posts').add(post).then(() => {
      app.loadPosts();
    });
    document.querySelector('.txt-area').value = '';
  }
}

function btnDeleteComment(e) {
  const confirmDelete = confirm('deseja mesmo deletar?');
  const postColletion = firebase.firestore().collection('posts');

  if (confirmDelete) {
    const commentId = e.target.dataset.com;
    const postId = e.target.dataset.id;
    postColletion.doc(postId).get()
      .then((item) => {
        const commentsPost = item.data().comments;
        const filterComment = commentsPost.filter(comment => comment.id !== commentId);

        postColletion.doc(postId).update({
          comments: filterComment,
        });
      }).then(() => {
        app.loadPosts();
      });
  }
}

function btnPrintComment(e) {
  const userName = firebase.auth().currentUser.displayName;
  const userId = firebase.auth().currentUser.uid;
  const postid = e.target.dataset.id;
  const comment = document.querySelector(`#input-comment-${postid}`).value;
  db.collection('posts').doc().get().then(() => {
    const docPost = db.collection('posts').doc(postid);
    if (comment !== '') {
      docPost.update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          userName,
          comment,
          userId,
          id: new Date().getTime(),
        }),
      });
    }
  })
    .then(() => {
      app.loadPosts();
    });
}

function comment(e) {
  const postid = e.target.dataset.id;
  document.getElementById(`input-comment-${postid}`).classList.remove('hidden');
  document.getElementById(`input-comment-${postid}`).focus();
  document.getElementById(`btn-comment-${postid}`).classList.remove('hidden');
}

function like(e) {
  const postid = e.target.dataset.id;
  db.collection('posts').doc(postid).get().then((doc) => {
    const newlike = (doc.data().likes) + 1;
    db.collection('posts').doc(postid)
      .update({
        likes: newlike,
      });
  })
    .then(() => {
      app.loadPosts();
    });
}

function deletePost(e) {
  const id = e.target.dataset.id;
  const postColletion = firebase.firestore().collection('posts');
  postColletion.doc(id).delete()
    .then(() => {
      app.loadPosts();
    });
}

function editPost(e) {
  const postid = e.target.dataset.id;
  const posteditor = document.getElementById(postid);
  posteditor.classList.add('edit-txt');
  posteditor.setAttribute('contenteditable', 'true');
  posteditor.focus();
  document.getElementById(`save-${postid}`).classList.remove('hidden');
}

function save(e) {
  const postid = e.target.dataset.id;
  const posteditor = document.getElementById(postid);
  const newtext = posteditor.textContent;
  db.collection('posts').doc(postid)
    .update({
      text: newtext,
    }).then(() => {
      posteditor.setAttribute('contenteditable', 'false');
      document.getElementById(`save-${postid}`).classList.add('hidden');
      app.loadPosts();
    });
}

function printPosts(post) {
  const postList = document.querySelector('.posts');
  const atual = firebase.auth().currentUser;
  const autor = post.data().user_id;
  const avatar = 'https://api.adorable.io/avatars/70/';
  let privacytype = post.data().privacy;
  if (privacytype === 'public') {
    privacytype = '<span class="tooltip"><img class="icon-earth" src="./images/earth.svg"><span class="tooltip-text">Público</span></img></span>';
  } else {
    privacytype = '<span class="tooltip"><img class="icon-padlock" src="./images/padlock.svg"><span class="tooltip-text">Privado</span></img></span>';
  }

  let postTemplate = `
    <li>
      <img class="avatar" src=${avatar + autor}></img>
      <div id="post-area">
        <p class="user-name">${post.data().user_name}</p>
        <p class="time-area">${post.data().timestamp.toDate().toLocaleString('pt-BR')} ${privacytype}
        <p id="${post.id}">${post.data().text}</p>
        <div class="btn-icons">
          <div class="commom-btn">
            ${Button({
    dataId: post.id, class: 'btn-like', title: '', onClick: like,
  })}
            ${post.data().likes}
            ${Button({
    dataId: post.id, class: 'btn-comment', title: '', onClick: comment,
  })}
          </div>
  `;
  if (atual.uid === autor) {
    postTemplate += `
        <div class="author-btn">
          ${Button({
    dataId: post.id, class: 'btn-edit', title: '', onClick: editPost,
  })}
          ${Button({
    dataId: post.id, id: `save-${post.id}`, class: 'btn-save hidden', title: '', onClick: save,
  })}
          ${Button({
    dataId: post.id, class: 'btn-delete', title: '', onClick: deletePost,
  })}
        </div>
      </div>
      <hr>
    `;
  } else {
    postTemplate += '</div> <hr>';
  }
  if (post.data().comments.length !== 0) {
    postTemplate += `
      <div class='comments-box' id='comment-div-${post.id}'>
        ${post.data().comments.map((item) => {
    if (item.userId === atual.uid || atual.uid === autor) {
      return `<p>
          <span class="user-name-comment">${item.userName}:</span>
          <span>${item.comment}</span>
            <span class='box-delete-comment'>
            ${Button({
    dataId: post.id, idCom: item.id, class: 'btn-delete-comment', title: '', onClick: btnDeleteComment,
  })}
            </span>`;
    }
    return `<p>
          <span class="user-name-comment">${item.userName}: </span>
          <span>${item.comment}</span>
          <hr class="hr">
        </p>`;
  }).join('')}
      </div>
    `;
  }
  postTemplate += `
    ${Input({
    type: 'text', id: `input-comment-${post.id}`, dataId: post.id, class: 'input-comment hidden', placeholder: 'Escreva um comentário', value: '',
  })}
    ${Button({
    id: `btn-comment-${post.id}`, dataId: post.id, class: 'primary-button hidden', title: 'Enviar', onClick: btnPrintComment,
  })}
    </li>
    </div>
  `;
  postList.innerHTML += postTemplate;
}

function loadPosts() {
  const user = firebase.auth().currentUser;
  postColletion
    .orderBy('timestamp')
    .get()
    .then((snap) => {
      document.querySelector('.posts').innerHTML = '';
      snap.forEach((post) => {
        if (post.data().user_id === user.uid || post.data().privacy === 'public') {
          printPosts(post);
        }
      });
    });
}

function Home(props) {
  app.loadPosts();

  const template = `
    ${Nav()}
    <section class="home-container">
      <div id="greetings">
        <img class="avatar" src="https://api.adorable.io/avatars/70/${props.uid}"></img>
        <div  class="bio">
          <h2 class="user-name">${props.name}</h2>
          <p>${props.aboutme}</p>
        </div>
      </div>
      <section class="new-post">
        <textarea class="txt-area" rows="5" cols="40" required placeholder="Qual é a sua dúvida?"></textarea>
        <div class="txt-btn">
          <select class="privacy" id="privacy">
            <option value="public">Público 🔓</option>
            <option value="private">Somente para mim 🔐</option>
          </select>
          ${Button({
    id: 'btn-print', title: 'Publicar', class: 'primary-button', onClick: btnPrint,
  })}
        </div>
        <ul class="posts"><img class ="loading" src="../images/loading.gif"></img></ul>
      </section>
    </section>
  `;

  return template;
}

window.app = {
  loadPosts,
};

export default Home;
