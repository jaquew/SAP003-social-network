import Login from './pages/login.js';
import Register from './pages/register.js';
import Home from './pages/home.js';
import Profile from './pages/profile.js';


function locationHashChanged() {
  firebase.auth().onAuthStateChanged((user) => {    
    switch (location.hash) {
      case '#register':
        user ? window.location = '#home' : document.querySelector('main').innerHTML = Register();
        break;
      case '#home':
        if (user) {
          db.collection('users').doc(user.email).get().then((snap) => {
            document.querySelector('main').innerHTML = Home(snap.data());
          })
        } else {
          window.location = '#login';
        }
        break;
      case '#login':
        user ? window.location = '#home' : document.querySelector('main').innerHTML = Login();
        break;
        case '#profile':
         if (user) {
          db.collection('users').doc(user.email).get().then((snap) => {
            document.querySelector('main').innerHTML = Profile(snap.data());
          })
         } else {
           window.location = '#login';
         }
         break;
      default:
        window.location = '#login';
    }
  });
}

window.addEventListener('hashchange', locationHashChanged, false);
window.addEventListener('load', locationHashChanged, false);