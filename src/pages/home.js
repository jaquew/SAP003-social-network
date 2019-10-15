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
  
  const template = `
    <nav class="menu">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#profile">Perfil</a></li>
        <li><a href="#timeline">Postagens</a></li>
      </ul>
      ${Button({ id: 'btn-exit', title: 'SAIR', onClick: btnSignOut })}
    </nav>

    <section>
      <h3>Escreva aqui<h3>
      <textarea class="txtArea" rows="5" cols="60"></textarea>
      ${Button({ id: 'btn-print', title: 'PRINTA JESUS', onClick: btnPrint })}
    </section>    
    <h1>Essa é a sua timeline</h1>

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
    user_id: user.displayName
    // coments: [],
    //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  }
  // salvando o objeto no banco de dados
  firebase.firestore().collection('posts').add(post).then(res => {
      app.loadPosts()
    });
      document.querySelector('.txtArea').value = ''
      // return res
  // })
  // .then(res => {
    // console.log(res)
    // app.loadPosts()
  // })
}

function printPosts(post) {
  const postList = document.querySelector('.posts')
  
  const postTemplate = `
  <li>
  ${post.data().text} ${post.data().likes}
  </li>
  `
  postList.innerHTML += postTemplate;
}

function loadPosts() {
  console.log(postColletion)
  // const postList = document.querySelector('.posts')
  postColletion.get().then(snap => {
    document.querySelector('.posts').innerHTML = ''
    snap.forEach(post => {
      printPosts(post)
    })
  })

}
window.app = {
  loadPosts: loadPosts,
}


window.addEventListener('load', loadPosts)


export default Home;
