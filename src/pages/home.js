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
      <h1>Essa é a sua timeline</h1>
      <h3>Escreva aqui<h3>
      <textarea class="txtArea" rows="5" cols="60"></textarea>
      ${Button({ id: 'btn-print', title: 'PRINTA JESUS', class: 'primary-button', onClick: btnPrint })}
    </section>

    <ul class="posts"></ul>
  `;
  return template;
}

function btnPrint() {
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
  console.log(post);

  // salvando o objeto no banco de dados
  firebase.firestore().collection('posts').add(post).then(res => {
      app.loadPosts()
    });
      document.querySelector('.txtArea').value = ''
}
//
function printPosts(post) {
  const postList = document.querySelector('.posts')

  const atual = firebase.auth().currentUser.uid;
  const autor = post.data().user_id
  
  let postTemplate = `
  <li><p> ${post.data().user_name}: </p>
  <div id="${post.id}">${post.data().text}</div>
  ${Button({dataId: post.id, class: 'btn-like', title: '❤️', onClick: like})}
  ${post.data().likes} 
  <p>${post.data().timestamp.toDate().toLocaleString('pt-BR')}</p>
  `
  if (autor === atual) {
    postTemplate += `
  <p>${Button({ dataId: post.id, class: 'btn-delete', title: '❌', onClick: deletePost})}
  ${Button({ dataId: post.id, class: 'btn-edit', title: 'Editar', onClick: editPost})} 
  ${Button({ dataId: post.id, class: 'btn-save', title: 'Salvar', onClick: save})}</p>
  </li>
  `
  }else {
    `<li>`
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

function like (){
  postid = event.target.dataset.id
  db.collection('posts').doc(postid).get()
  .then( function (doc){
    let newlike = (doc.data().likes)+1
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
  .then(function() {
    console.log('Document successfully deleted!');
    app.loadPosts()
  })
}

function editPost(event){
  postid = event.target.dataset.id

  const posteditor = document.getElementById(postid)
  posteditor.setAttribute('contenteditable', 'true');
}

function save(event){
  postid = event.target.dataset.id
  // console.log(postid)
  const posteditor = document.getElementById(postid)
  newtext = posteditor.textContent
  // console.log(newtext);
  db.collection('posts').doc(postid)
  .update({
    text: newtext,
  });
  posteditor.setAttribute('contenteditable', 'false');

}


window.app = {
  loadPosts: loadPosts,
}

export default Home;
