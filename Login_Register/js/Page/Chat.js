
import { ButtonCommon } from "../Common/ButtonCommon.js";
import {Login} from "./Login.js"

class Chat {
  Container = document.createElement("div");
  btnLogOut = new ButtonCommon("LogOut","button","Log Out");
  constructor() {
    this.Container.innerHTML = "Chat";

    this.btnLogOut.html().addEventListener("click",this.handleLogOut);

    this.Container.appendChild(this.btnLogOut.html());
    let divChat = document.getElementById("chat");
    divChat.appendChild(this.Container);
  }
  handleLogOut = (e)=>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("Sign out  successful");
      window.location = "../html/index.html";
      
    }).catch((error) => {
      // An error happened.
      console.log(error.message);
    });
  }
}
let chat = new Chat();

export{Chat};