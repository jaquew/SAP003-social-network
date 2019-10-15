import Login from './pages/login.js';
import Register from './pages/register.js';
import Home from './pages/home.js';

function locationHashChanged() {
  firebase.auth().onAuthStateChanged(function (user) {
    switch (location.hash) {
      case '#register':
        user ? window.location = '#home' : document.querySelector('main').innerHTML = Register();
        break;
      case '#home':
        user ? document.querySelector('main').innerHTML = Home() : window.location = '#login'
        break;
      case '#login':
        user ? window.location = '#home' : document.querySelector('main').innerHTML = Login()
        break;
      case '#profile':
        user ? document.querySelector('main').innerHTML = Profile() : window.location = '#login'
        break;
      default:
        window.location = '#login'
    }
  })
}

window.addEventListener('hashchange', locationHashChanged, false)
window.addEventListener('load', locationHashChanged, false)