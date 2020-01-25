/* eslint-disable indent */
/* eslint-disable no-alert */
import Button from '../components/button.js';
import Input from '../components/input.js';

function btnRegister() {
  const email = document.querySelector('.js-email-register').value;
  const password = document.querySelector('.js-password-register').value;
  const name = document.querySelector('.js-name-register').value;
  const lastname = document.querySelector('.js-lastname-register').value;
  const birthday = document.querySelector('.js-birthday-register').value;
  if (email && name && lastname && birthday && password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      const user = firebase.auth().currentUser;
      if (user != null) {
        window.location = '#home';
        db.collection('users').doc(email).set({
          name,
          lastname,
          birthday,
          email,
          uid: user.uid,
          aboutme: '',
        });
      }
      user.updateProfile({
        displayName: name,
      });
    });
  } else {
    alert('Por favor, preencha todos os campos!');
  }
}

function btnBack() {
  window.location = '#login';
}

function passValidation() {
  const password = document.querySelector('.js-password-register').value;
  const buttonRegister = document.querySelector('#btnRegister');
  const re = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/);
  const pass = document.getElementById('pw-warn');
  pass.textContent = '';
  if (password.match(re)) {
    buttonRegister.disabled = false;
    buttonRegister.style.backgroundColor = '#F76900';
  } else {
    buttonRegister.disabled = true;
    buttonRegister.style.backgroundColor = '#808080';
    pass.textContent = 'A senha deve conter pelo menos 1 letra, 1 número e no mínimo 8 caracteres.';
  }
}

function Register() {
  const template = `
    <section class="register-layout">
      <h1>Registre-se!</h1>
      <form class="register-box">
      ${Input({
        type: 'text',
        class: 'js-name-register',
        id: 'name-register',
        placeholder: 'Digite seu nome',
        value: '',
      })}
      ${Input({
        type: 'text',
        class: 'js-lastname-register',
        id: 'lastname-register',
        placeholder: 'Digite seu sobrenome',
        value: '',
      })}
      ${Input({
        type: 'date',
        class: 'js-birthday-register',
        id: 'birthday-register',
        placeholder: 'Digite sua data de nascimento',
        value: '',
      })}
      ${Input({
        type: 'email',
        class: 'js-email-register',
        id: 'email-register',
        placeholder: 'Digite seu e-mail',
        value: '',
      })}
      ${Input({
        type: 'password',
        class: 'js-password-register',
        id: 'password-register',
        placeholder: 'Digite a senha',
        ev: 'onkeyup',
        evFunction: passValidation,
        value: '',
      })}
      <p id='pw-warn'></p>
      </form>
      <form class="btnregister">
      ${Button({
        class: 'primary-button',
        title: 'Voltar',
        id: 'btnBack',
        onClick: btnBack,
      })} 
      ${Button({
        class: 'primary-button',
        title: 'Registrar',
        id: 'btnRegister',
        onClick: btnRegister,
      })}
      </form>
    </section>
  `;
  return template;
}

export default Register;
