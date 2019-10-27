import Button from '../components/button.js';
import Input from '../components/input.js';

function buttonLogin() {
  const email = document.querySelector('.input-email').value;
  const password = document.querySelector('.input-password').value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    const errorCode = error.code;
    if (errorCode === 'auth/user-not-found') {
      alert('Usuário não encontrado!');
    } else if (errorCode === 'auth/invalid-email') {
      alert('Digite um e-mail válido!');
    } else if (errorCode === 'auth/wrong-password') {
      alert('Email ou senha inválido!');
    }
  });
  firebase.auth().onAuthStateChanged((user) => {
    console.log('onauth do login');
    
    if (user) {
      window.location = '#home';
    }
  });
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(() => {
    const user = firebase.auth().currentUser;
    user.providerData.forEach((profile) => {
      db.collection('users').doc(profile.email).get().then((doc) => {
        if (!doc.exists) {
          db.collection('users').doc(profile.email).set({
            name: profile.displayName,
            email: profile.email,
            uid: user.uid,
            dn: '',
            sobrenome: '',
            aboutme: '',
          });
        }
      });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          window.location = '#home';
        }
      });
    });
  });
}

function Login() {
  const template = `
  <section class="login-layout">
      <img src='./images/logo1.png' id="image"></img>
      <div class="container">
        <h2>Olá, bem-vindo</h2>
        <form class="login-box">
          ${Input({ class: 'input-email', placeholder: 'email', type: 'email', value: '' })}

          ${Input({ class: 'input-password', placeholder: 'password', type: 'password', value: '' })}

          ${Button({ id: 'entrar', title: 'Entrar', class: 'primary-button', onClick: buttonLogin })}
          ${Button({ id: 'google', title: 'Entrar com sua conta do Google', class: 'btn-google', onClick: googleLogin })}
        </form>
        <p>Não tem conta? <a href="#register">Registre-se</a></p>
      </div>
    </section>
  `;
  return template;
}
export default Login;