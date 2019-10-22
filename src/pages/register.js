import Button from '../components/button.js';
import Input from '../components/input.js';

function btnRegister() {
  console.log('Tá rodando btnReg')
  let email = document.querySelector('.js-email-register').value;
  const password = document.querySelector('.js-password-register').value;
  let name = document.querySelector('.js-name-register').value;
  let lastname = document.querySelector('.js-lastname-register').value;
  let birthday = document.querySelector('.js-birthday-register').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
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
      ${Input({ type: 'text', class: 'js-name-register', onBlur: nullFunction, placeholder: 'Digite seu nome' })}
      ${Input({ type: 'text', class: 'js-lastname-register', onBlur: nullFunction, placeholder: 'Digite seu sobrenome' })}
      ${Input({ type: 'date', class: 'js-birthday-register', onBlur: nullFunction, placeholder: 'Digite sua data' })}
      ${Input({ type: 'email', class: 'js-email-register', onBlur: nullFunction, placeholder: 'Digite seu e-mail' })}
      ${Input({ type: 'email', class: 'js-email-confirm', id: 'email-confirm', onBlur: confirmEmail, placeholder: 'Digite seu e-mail novamente' })}
      <p id='aviso'></p>
      ${Input({ type: 'password', class: 'js-password-register', onBlur: nullFunction, placeholder: 'Digite a senha' })}
      ${Input({ type: 'password', class: 'js-password-confirm', onBlur: confirmPassword, placeholder: 'Digite a senha novamente' })}

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

function confirmEmail() {
  let email = document.querySelector('.js-email-register').value;
  let emailConfirm = document.querySelector('.js-email-confirm').value;
  const buttonRegister = document.querySelector('#btnRegister');
  if (email !== emailConfirm) {
    document.querySelector('#aviso').innerHTML = 'E-mails não coincidem';
    buttonRegister.disabled = true;
    buttonRegister.style.backgroundColor = '#808080';
  } else {
    document.querySelector('#aviso').innerHTML = '';
    buttonRegister.disabled = false;
    buttonRegister.style.backgroundColor = '#F76900';
  }
}

function confirmPassword() {
  let password = document.querySelector('.js-password-register').value;
  let passwordConfirm = document.querySelector('.js-password-confirm').value;
  const buttonRegister = document.querySelector('#btnRegister');
  if (password !== passwordConfirm) {
    document.querySelector('#aviso').innerHTML = 'Senhas não coincidem';
    buttonRegister.disabled = true;
    buttonRegister.style.backgroundColor = '#808080';
  } else {
    document.querySelector('#aviso').innerHTML = '';
    buttonRegister.disabled = false;
    buttonRegister.style.backgroundColor = '#F76900';
  }
}

function nullFunction() {
  return undefined;
}

export default Register;
