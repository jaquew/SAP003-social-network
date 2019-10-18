import Button from '../components/button.js';
import Input from '../components/input.js';

function btnRegister() {
  console.log('Tá rodando btnReg')
  let email = document.querySelector('.js-email-register').value;
  const password = document.querySelector('.js-password-register').value;
  let name = document.querySelector('.js-name-register').value;
  let lastname = document.querySelector('.js-lastname-register').value;
  let birthday = document.querySelector('.js-birthday-register').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
    user = firebase.auth().currentUser;
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
    user.updateProfile({
      displayName: name
    })
  })
}


function btnBack() {
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
      ${Input({ type: 'file', class: 'my-file'})}
      </form>
      <form class="btnregister">
      ${Button({
      class: 'primary-button', title: 'Registrar', id: 'btnRegister', onClick: btnRegister,
    })}
      ${Button({
      class: 'primary-button', title: 'Voltar', id: 'btnBack', onClick: btnBack,
    })} 
      </form>
    </section>
  `;
  return template;
}

export default Register;