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
  // console.log(textArea)
  const user = firebase.auth().currentUser;

  const post = {
    text: textArea,
    likes: 0,
    user_id: user.displayName,
    coments: [],
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
  var id = post.id
  console.log(id);
  const postTemplate = `

  <li> ${post.data().user_id}: ${post.data().text}
  ${Button({ id: 'btn-like', class: 'btn-like', title: '❤️', onClick: like})}
  ${post.data().likes} ${Button({ id: 'btn-delete', class: 'btn-delete', title: '❌', onClick: deletePost})}
  <p>${post.data().timestamp.toDate().toLocaleString('pt-BR')}
  </li>
  `
  postList.innerHTML += postTemplate;
}

function loadPosts() {
  // const postList = document.querySelector('.posts')
  postColletion.get().then(snap => {
    document.querySelector('.posts').innerHTML = ''
    snap.forEach(post => {
      printPosts(post)
    })
  })
}

function like (){
  console.log(id);
  db.collection('posts').doc(id).set({
    likes: 4
  }).then(function() {
    console.log('Document successfully written!');
  })
}

function deletePost(postId) {
  // const postColletion = firebase.firestore().collection
  db.collection('posts').doc('textArea').delete().then(function() {
    console.log('Document successfully deleted!');
    app.loadPosts()
  }).catch(function(error) {
    //console.error('Error removing document: ', error);
  });
}


window.app = {
  loadPosts: loadPosts,
}

export default Home;
