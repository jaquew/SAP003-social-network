import Button from '../components/button.js';
// import Print from '../components/input.js'
// import Input from '../components/input.js';
const postColletion = firebase.firestore().collection('posts')


function btnSignOut() {
  firebase.auth().signOut().then(function () {
    window.location = '#login';
  }).catch(function (error) {
    // An error happened.
  });
}

function Home() {
  app.loadPosts()
  const template = `
    <nav class="menu">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#profile">Perfil</a></li>
      </ul>
      ${Button({ id: 'btn-exit', class: 'primary-button',  title: 'SAIR', onClick: btnSignOut })}
    </nav>

    <section>
      <div class="txt-area">
        <textarea class="txtArea" rows="5" cols="40" required placeholder="Qual é a sua meta de hoje?"></textarea>
      </div>
      ${Button({ id: 'btn-print', title: 'Publicar', class: 'primary-button', onClick: btnPrint })}
      
      </section>

    <ul class="posts"></ul>
  `;
  return template;
}

function btnPrint() {
  const content = document.querySelector('.txtArea').value;
  console.log(content)
  if (content !== null && content !== '') {
    const textArea = document.querySelector('.txtArea').value
    const user = firebase.auth().currentUser;
    const post = {
      text: textArea,
      likes: 0,
      user_id: user.uid,
      user_name: user.displayName,
      coments: [],
      privacy: 'public',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }
    // salvando o objeto no banco de dados
    firebase.firestore().collection('posts').add(post).then(res => {
      app.loadPosts()
    });
    document.querySelector('.txtArea').value = ''
  }
}
//
function printPosts(post) {
  const postList = document.querySelector('.posts')

  const atual = firebase.auth().currentUser.uid;
  const autor = post.data().user_id

const postTemplate = `
  <li> ${post.data().user_name}:
  <span id="${post.id}">${post.data().text}</span>
  <p>${post.data().timestamp.toDate().toLocaleString('pt-BR')}</p>
  <div class="btn-icons">
    ${Button({dataId: post.id, class: 'btn-like', title: '❤️', onClick: like})}${post.data().likes} 
    ${Button({ dataId: post.id, class: 'btn-comment', title: '💬'})}
  `
  if (atual==autor) {
    postTemplate += `
    ${Button({ dataId: post.id, class: 'btn-delete', title: '❌', onClick: deletePost})}
    ${Button({ dataId: post.id, class: 'btn-edit', title: '✏️', onClick: editPost})}
    ${Button({ dataId: post.id, class: 'btn-save hidden', title: '✔️', onClick: save})}
    </div>
    </li>
    `
  }else {
    ostTemplate += `
    </div>
    </li>
    `
  }
  postList.innerHTML += postTemplate;
}

function loadPosts() {
  // const postList = document.querySelector('.posts')
  postColletion
    // .where('user_id', '===', 'user.uid')
    .get().then(snap => {
      document.querySelector('.posts').innerHTML = ''
      snap.forEach(post => {
        const user = firebase.auth().currentUser
        printPosts(post)
      })
    })
}

function like(event) {
  const postid = event.target.dataset.id
  db.collection('posts').doc(postid).get()
    .then(function (doc) {
      let newlike = (doc.data().likes) + 1
      db.collection('posts').doc(postid)
        .update({
          likes: newlike
        })
    })
  app.loadPosts()
}

function deletePost(event) {
  const id = event.target.dataset.id
  const postColletion = firebase.firestore().collection('posts')
  postColletion.doc(id).delete()
    .then(function () {
      console.log('Document successfully deleted!');
      app.loadPosts()
    })
}

function editPost(event) {
  const postid = event.target.dataset.id
  // console.log(postid);
  // console.log('rodou edit');
  const posteditor = document.getElementById(postid)
  posteditor.setAttribute('contenteditable', 'true');
  const savebtn = document.getElementsByClassName('btn-save').classList.remove('hidden')
}

function save(event) {
  const postid = event.target.dataset.id
  // console.log(postid)
  const posteditor = document.getElementById(postid)
  const newtext = posteditor.textContent
  // console.log(newtext);
  db.collection('posts').doc(postid)
    .update({
      text: newtext,
    });
  posteditor.setAttribute('contenteditable', 'false');
  const savebtn = document.getElementsByClassName('btn-save').classList.add('hidden')

}

window.app = {
  loadPosts: loadPosts,
}

export default Home;