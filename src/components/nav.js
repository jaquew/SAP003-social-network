import Button from './button.js';

function btnSignOut() {
  firebase.auth().signOut().then(() => {
    window.location = '#login';
  });
}

function Nav() {
  return (
    `<nav class="menu">
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#profile">Perfil</a></li>
      ${Button({
        id: 'btn-exit',
        class: 'btn-exit',
        title: 'SAIR',
        onClick: btnSignOut,
        })}
    </ul>
  </nav>`
  );
}

export default Nav;
