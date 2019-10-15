import Button from '../components/button.js';
import Input from '../components/input.js';

function btnRegister() {
  let email = document.querySelector('.js-email-register').value;
  const password = document.querySelector('.js-password-register').value;
  let name = document.querySelector('.js-name-register').value;
  let lastname = document.querySelector('.js-lastname-register').value;
  let birthday = document.querySelector('.js-birthday-register').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then( function () {
  firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;    
    user.updateProfile({
      displayName: name
    })
    if (user != null) {
      uid = user.uid; 
      window.location = '#home';
      db.collection('users').add({
        name: name,
        sobrenome: lastname,
        dn: birthday,
        email: email,
        uid: uid
      })
    } 
    // else {
      //No user is signed in}
  });
})
}

function btnVoltar() {
  window.location = '#login';
}

function Register() {
  const template = `
    <section class="register-layout">
      <h1>Registre-se!</h1>
      <form class="register-box">
      ${Input({ type: 'text', class: 'js-name-register', placeholder: 'Digite seu nome' })}
      ${Input({ type: 'text', class: 'js-lastname-register', placeholder: 'Digite seu sobrenome' })}
      ${Input({ type: 'date', class: 'js-birthday-register', placeholder: 'Digite sua data' })}
      ${Input({ type: 'email', class: 'js-email-register', placeholder: 'Digite seu e-mail' })}
      ${Input({ type: 'password', class: 'js-password-register', placeholder: 'Digite a senha' })}
      </form>
      <form class="btn-register">
      ${Button({
      class: 'js-btn-register', title: 'Registrar', id: 'btnRegister', onClick: btnRegister,
    })}
      ${Button({
      class: 'js-btn-voltar', title: 'Voltar', id: 'btnVoltar', onClick: btnVoltar,
    })} 
      </form>
    </section>
  `;
  return template;
}

export default Register;
