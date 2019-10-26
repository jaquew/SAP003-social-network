import Button from '../components/button.js';
import Input from '../components/input.js';

function btnRegister() {
  const email = document.querySelector('.js-email-register').value;
  const password = document.querySelector('.js-password-confirm').value;
  const name = document.querySelector('.js-name-register').value;
  const lastname = document.querySelector('.js-lastname-register').value;
  const birthday = document.querySelector('.js-birthday-register').value;
  if (email && name && lastname && birthday && password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      const user = firebase.auth().currentUser;
      if (user != null) {
        window.location = '#home';
        db.collection('users').doc(email).set({
          name: name,
          sobrenome: lastname,
          dn: birthday,
          email: email,
          uid: user.uid,
          aboutme: '',
        });
      }
      user.updateProfile({
        displayName: name,
      });
    });
  } else{
    alert('Por favor, preencha todos os campos!')
  }

}


function btnBack() {
  window.location = '#login';
}

function Register() {
  const template = `
    <section class="register-layout">
      <h1>Registre-se!</h1>
      <form class="register-box">
      ${Input({ type: 'text', class: 'js-name-register', id: 'name-register', placeholder: 'Digite seu nome', value: '' })}
      ${Input({ type: 'text', class: 'js-lastname-register', id: 'lastname-register', placeholder: 'Digite seu sobrenome', value: '' })}
      ${Input({ type: 'date', class: 'js-birthday-register', id: 'birthday-register', placeholder: 'Digite sua data', value: '' })}
      ${Input({ type: 'email', class: 'js-email-register', id: 'email-register', placeholder: 'Digite seu e-mail', value: '' })}
      ${Input({ type: 'email', class: 'js-email-confirm', id: 'email-confirm', ev: 'onkeyup', evFunction: confirmEmailPass, placeholder: 'Digite seu e-mail novamente', value: '' })}
      ${Input({ type: 'password', class: 'js-password-register', id: 'password-register', placeholder: 'Digite a senha', ev: 'onkeyup', evFunction: passValidation, value: '' })}
      <p id='pw-warn'></p>
      ${Input({ type: 'password', class: 'js-password-confirm', id: 'password-confirm', ev: 'onkeyup', evFunction: confirmEmailPass, placeholder: 'Digite a senha novamente', value: ''})}
      <p id='aviso'></p>
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

function confirmEmailPass() {  
  const email = document.querySelector('.js-email-register').value;
  const emailConfirm = document.querySelector('.js-email-confirm').value;
  const password = document.querySelector('.js-password-register').value;
  const passwordConfirm = document.querySelector('.js-password-confirm').value;
  const buttonRegister = document.querySelector('#btnRegister');
  if (email !== emailConfirm) {
    document.querySelector('#aviso').innerHTML = 'E-mails não coincidem';
    buttonRegister.disabled = true;
    buttonRegister.style.backgroundColor = '#808080';
  } else if (passwordConfirm && password !== passwordConfirm) {
    document.querySelector('#aviso').innerHTML = 'Senhas não coincidem';
    buttonRegister.disabled = true;
    buttonRegister.style.backgroundColor = '#808080';
  } else {
    document.querySelector('#aviso').innerHTML = '';
    buttonRegister.disabled = false;
    buttonRegister.style.backgroundColor = '#F76900';
  }
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

export default Register;
