import { InputCommon } from "../Common/InputCommon.js";
import { ButtonCommon } from "../Common/ButtonCommon.js";
import { LinkCommon } from "../Common/LinkCommon.js";
import { Input } from "../Common/Input.js";
import { SignUp } from "./SignUp.js";

class Login {
  form = document.createElement("form");
  inputUser = new InputCommon(
    "material-icons icon",
    "",
    "inputLogin input",
    "text",
    "Username",
    "Username"
  );
  inputPw = new InputCommon(
    "material-icons icon",
    "",
    "inputLogin input",
    "password",
    "Password",
    "password"
  );
  inputCheckBox = new Input("", "remember", "checkbox", "", "checkbox");
  buttonLogin = new ButtonCommon("btn_Login", "submit", "Login");
  buttonSignUp = new ButtonCommon("btn_sign", "button", "Sign up");

  constructor() {
    this.inputUser.setValue(localStorage.getItem("User"));
    this.inputPw.setValue(localStorage.getItem("Password"));

    this.form.setAttribute("class", "form_login animate");

    let h1 = document.createElement("h1");
    h1.classList.add("text_login");
    h1.innerHTML = "Login";

    let div = document.createElement("div");
    div.classList.add("link_other");

    let fb = new LinkCommon("#", "fb", "fa fa-facebook fa-fw", "Facebook");
    let tw = new LinkCommon("#", "twitter", "fa fa-twitter fa-fw", "Twitter");
    let google = new LinkCommon("#", "google", "fa fa-google fa-fw", "Google+");

    div.appendChild(fb.html());
    div.appendChild(tw.html());
    div.appendChild(google.html());

    this.inputUser.textI("&#xe7fd;");
    this.inputPw.textI("&#xe63f;");

    ////check box remember me;

    let span = document.createElement("span");
    span.style.margin = "0 10px";
    span.style.color = "white";
    span.innerHTML = "Remember me";

    this.inputCheckBox.container.appendChild(span);
    this.inputCheckBox.container.style.margin = "30px 0";
    ////////////////////////////////////////

    this.form.appendChild(h1);
    this.form.appendChild(this.inputUser.html());
    this.form.appendChild(this.inputPw.html());
    this.form.appendChild(this.inputCheckBox.html());

    this.form.appendChild(this.buttonLogin.html());
    this.form.insertAdjacentHTML("beforeend", "<hr>");
    this.form.appendChild(div);
    this.form.appendChild(this.buttonSignUp.html());

    this.buttonSignUp.html().addEventListener("click", this.handleRedirectSignUp);
    this.buttonLogin.html().addEventListener("click", this.handleLogin);
  }

  html() {
    return this.form;
  }
  handleRedirectSignUp = (e) => {
    e.preventDefault();

    let signUpScreen = new SignUp();
    let login = document.getElementById("login");
    login.innerHTML = "";
    login.style.margin = 0;
    let Sign = document.getElementById("signUp");
    Sign.appendChild(signUpScreen.html());
  };
  handleLogin = (e) => {
    e.preventDefault(true);
    const email = this.inputUser.getValue();
    const password = this.inputPw.getValue();
    if (this.checkInputEmpty(email, password) == true) {
      firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          if (this.inputCheckBox.input.checked == true) {
            localStorage.setItem("User", email);
            localStorage.setItem("Password", password);
          } else {
            localStorage.setItem("User", "");
            localStorage.setItem("Password", "");
          }
          console.log(`Dang nhap thanh cong`);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);

          this.inputPw.setHtmlErr("Tài khoản hoặc mật khẩu không chính xác");
        });
    }
  };

  checkInputEmpty(email, password) {
    if (email == "") {
      this.inputUser.setHtmlErr("Bạn chưa nhập tài khoản");
    } else if (password == "") {
      this.inputUser.setHtmlErr("");
      this.inputPw.setHtmlErr("Bạn chưa nhập mật khẩu");
    } else {
      return true;
    }
    return false;
  }
}

export { Login };
