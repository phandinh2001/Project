import { InputCommon } from "../Common/InputCommon.js";
import { ButtonCommon } from "../Common/ButtonCommon.js";
import { Input } from "../Common/Input.js";
import { Login } from "./Login.js";

class SignUp {
  form = document.createElement("form");
  inputUser = new InputCommon(
    "material-icons icon",
    "",
    "inputUser input",
    "text",
    "Your Name",
    "Name"
  );
  inputEmail = new InputCommon(
    "material-icons icon",
    "",
    "inputEmail input",
    "email",
    "Your Email",
    "Email"
  );
  inputPw = new InputCommon(
    "material-icons icon",
    "",
    "inputPW input",
    "password",
    "Password",
    "password"
  );
  inputRepeatPw = new InputCommon(
    "material-icons icon",
    "",
    "inputPW input",
    "password",
    "Repeat Password",
    "RePassword"
  );
  inputCheckbox = new Input("", "", "checkbox", "", "");
  buttonSignUp = new ButtonCommon("btnSignUp", "submit", "Sign Up");
  buttonCancel = new ButtonCommon("btnCancel", "button", "Cancel");
  constructor() {
    this.form.setAttribute("class", "form_signUp animate");
    this.form.action = "#";

    let h1 = document.createElement("h1");
    h1.classList.add("text_signUp");
    h1.innerHTML = "Sign up";

    this.inputUser.textI("&#xe7fd;");
    this.inputPw.textI("&#xe63f;");
    this.inputRepeatPw.textI("&#xe63f;");
    this.inputEmail.textI("&#xe158;");

    ////check box remember me;
    let span = document.createElement("span");
    span.innerHTML = " By creating an account you agree to our ";
    span.insertAdjacentHTML(
      "beforeend",
      '<a style="color:dodgerblue">Terms & Privacy.</a>'
    );
    span.style.color = "white";
    this.inputCheckbox.html().appendChild(span);
    this.inputCheckbox.html().style.margin = "15px 0 0 0";

    ///

    this.form.appendChild(h1);
    this.form.appendChild(this.inputUser.html());
    this.form.appendChild(this.inputEmail.html());
    this.form.appendChild(this.inputPw.html());
    this.form.appendChild(this.inputRepeatPw.html());
    this.form.appendChild(this.inputCheckbox.html());

    this.form.appendChild(this.buttonSignUp.html());

    this.form.appendChild(this.buttonCancel.html());
    this.buttonCancel
      .html()
      .addEventListener("click", this.handleRedirectCancel);
    this.buttonSignUp.html().addEventListener("click", this.handleSignUp);
  }
  html() {
    return this.form;
  }
  handleRedirectCancel = (e) => {
    let loginScreen = new Login();
    let sign = document.getElementById("signUp");
    sign.innerHTML = "";
    let login = document.getElementById("login");
    login.style.marginTop = "5%";
    login.appendChild(loginScreen.html());
  };
  handleSignUp = (e) => {
    e.preventDefault();

    const name = this.inputUser.getValue();
    const email = this.inputEmail.getValue();
    const password = this.inputPw.getValue();
    const RePassword = this.inputRepeatPw.getValue();
    if (this.checkInput(name, email, password, RePassword) == true) {
      if (this.inputCheckbox.input.checked == true) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            this.logout();
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            // e.preventDefault();
            this.inputEmail.setHtmlErr("Email already in use");
          });
        const actionCodeSettings = {
          // URL you want to redirect back to. The domain (www.example.com) for this
          // URL must be in the authorized domains list in the Firebase Console.
          url: "https://www.example.com/finishSignUp?cartId=1234",
          // This must be true.
          handleCodeInApp: true,
        };
        firebase
          .auth()
          .sendSignInLinkToEmail(email, actionCodeSettings)
          .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem("emailForSignIn", email);
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
          // Additional state parameters can also be passed via URL.
          // This can be used to continue the user's intended action before triggering
          // the sign-in operation.
          // Get the email if available. This should be available if the user completes
          // the flow on the same device where they started it.
          var em = window.localStorage.getItem("emailForSignIn");
          if (!em) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt("Please provide your email for confirmation");
          }
          // The client SDK will parse the code from the link for you.
          firebase
            .auth()
            .signInWithEmailLink(email, window.location.href)
            .then((result) => {
              // Clear email from storage.
              window.localStorage.removeItem("emailForSignIn");
              // You can access the new user via result.user
              // Additional user info profile not available via:
              // result.additionalUserInfo.profile == null
              // You can check if the user is new or existing:
              // result.additionalUserInfo.isNewUser
            })
            .catch((error) => {
              // Some error occurred, you can inspect the code: error.code
              // Common errors could be invalid email and invalid or expired OTPs.
            });
        }
      }
    }
  };

  checkInput(name, email, password, RePassword) {
    if (this.checkName(name) == true)
      if (this.checkEmail(email) == true)
        if (this.checkPassword(password) == true)
          if (this.checkRepeatPassword(RePassword, password) == true)
            return true;
    return false;
  }
  checkName = (name) => {
    if (name == "") {
      this.inputUser.setHtmlErr("Name can not empty");
      return false;
    } else this.inputUser.setHtmlErr("");
    return true;
  };

  checkEmail = (email) => {
    if (email == "") this.inputEmail.setHtmlErr("Email can not empty");
    else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false
    )
      this.inputEmail.setHtmlErr("Email invalidated");
    else {
      this.inputEmail.setHtmlErr("");
      return true;
    }
    return false;
  };

  checkPassword = (password) => {
    if (password == "") this.inputPw.setHtmlErr("Password can not empty");
    else if (password.length < 6) {
      this.inputPw.setHtmlErr(
        "Password must be more than or equal to 6 characters"
      );
    } else {
      this.inputPw.setHtmlErr("");
      return true;
    }
    return false;
  };

  checkRepeatPassword = (RePassword, password) => {
    if (RePassword == "")
      this.inputRepeatPw.setHtmlErr("Repeat password can not empty");
    else if (RePassword != password)
      this.inputRepeatPw.setHtmlErr("password does not match");
    else {
      this.inputRepeatPw.setHtmlErr("");
      return true;
    }
    return false;
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Sign out  successful");
        window.location = "../html/index.html";
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };
}

export { SignUp };
