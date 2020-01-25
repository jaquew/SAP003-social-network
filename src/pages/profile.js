/* eslint-disable indent */
/* eslint-disable no-undef */
import Button from '../components/button.js';
import Input from '../components/input.js';
import Nav from '../components/nav.js';

function btnUpdate() {
  const name = document.querySelector('.js-name-profile').value;
  const lastname = document.querySelector('.js-lastname-profile').value;
  const birthday = document.querySelector('.js-birthday-profile').value;
  const text = document.querySelector('.js-description-profile').value;
  const user = firebase.auth().currentUser;
  if (text || name || lastname || birthday) {
    db.collection('users').doc(user.email).update({
      name,
      sobrenome: lastname,
      dn: birthday,
      aboutme: text,
    }).then(() => {
      user.updateProfile({ displayName: name });
      window.location = '#home';
    });
  }
}

function btnBack() {
  window.location = '#home';
}

function Profile(props) {
  const template = `
    ${Nav()}
    <section class="profile-layout">
      <h1>Atualize seu Perfil</h1>
      <form class="profile-box">
        ${Input({
          type: 'text',
          class: 'js-name-profile',
          id: 'name-profile',
          placeholder: 'Digite seu nome',
          value: props.name,
        })}
        ${Input({
          type: 'text',
          class: 'js-lastname-profile',
          id: 'lastname-profile',
          placeholder: 'Digite seu sobrenome',
          value: props.lastname,
        })}
        ${Input({
          type: 'date',
          class: 'js-birthday-profile',
          id: 'birthday-profile',
          placeholder: 'Digite sua data de nascimento',
          value: props.birthday,
        })}
        ${Input({
          type: 'text',
          class: 'js-description-profile',
          id: 'description-profile',
          placeholder: 'Fale um pouco sobre você',
          value: props.aboutme,
        })}

        <p id='aviso'></p>
      </form>
      <form class="btnprofile">
      ${Button({
        class: 'primary-button',
        title: 'Voltar',
        id: 'btnBack',
        onClick: btnBack,
      })}
      ${Button({
        class: 'primary-button',
        title: 'Salvar',
        id: 'btnUpdate',
        onClick: btnUpdate,
  })}
      </form>
    </section>
  `;
  return template;
}

export default Profile;
