import Button from '../components/button.js';
import Input from '../components/input.js';

function btnRegister() {
  const email = document.querySelector('.js-email-register').value;
  const password = document.querySelector('.js-password-register').value;
  firebase.auth().createUserWithEmailAndPassword(email, password);
}

function Register() {
  const template = `
    <h1>Registre-se!</h1>
    <form>
    ${Input({ type: 'text', class: 'js-name-register', placeholder: 'Digite seu nome' })}
    ${Input({ type: 'date', class: 'js-date-register', placeholder: 'Digite seu nascimento' })}
    ${Input({ type: 'email', class: 'js-email-register', placeholder: 'Digite seu e-mail' })}
    ${Input({ type: 'password', class: 'js-password-register', placeholder: 'Digite a senha' })}

    ${Button({
    class: 'js-btn-register', title: 'Registrar', id: 'btnRegister', onClick: btnRegister,
  })}

    </form>
  `;
  return template;
}

export default Register;
