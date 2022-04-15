import { Login } from "./Page/Login.js";
import { SignUp } from "./Page/SignUp.js";
class Application {
  divLogin = document.getElementById("login");
  divSign = document.getElementById("signUp");
  login = new Login();
  signUp = new SignUp();
  constructor() {
    this.divLogin.appendChild(this.login.html());
  }
}

let app = new Application();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    // ...

    window.location = "../html/Chat.html";
  } else {
    // window.location = "../html/index.html";
  }
});
