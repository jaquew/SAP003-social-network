import Login from './pages/login.js';
import Register from './pages/register.js';
import Home from './pages/home.js';
import Profile from './pages/profile.js';


function locationHashChanged() {
  console.log('loactionhash');
  
  firebase.auth().onAuthStateChanged((user) => {
    console.log('onauth');
        
    switch (location.hash) {
      case '#register':
        user ? window.location = '#home' : document.querySelector('main').innerHTML = Register();
        break;
      case '#home':
        console.log('case home');
        
        if (user) {
          console.log('if');
          
          db.collection('users').doc(user.email).get().then((snap) => {

            const data = snap.data()

            console.log(data);
            document.querySelector('main').innerHTML = Home(data);
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
            const data = snap.data()
           
            
            document.querySelector('main').innerHTML = Profile(data);
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