import { Input } from "./Input.js";

class InputCommon {
  container = document.createElement("div");
  div = document.createElement("div");

  input;
  i = document.createElement("i");
  err = document.createElement("span");
  hr = document.createElement("hr");
  constructor(clI, label, clInput, type, placeholder, name) {
    this.input = new Input(label, clInput, type, placeholder, name);

    this.i.setAttribute("class", clI);

    this.div.classList.add("inFor");

    this.div.appendChild(this.i);
    this.div.appendChild(this.input.html());

    this.container.appendChild(this.div);
    this.container.appendChild(this.hr);
    this.container.appendChild(this.err);

    this.err.style.color = "rgb(255, 74, 74)";
    this.err.style.fontSize = "15px";
    this.err.style.fontFamily = "boll"
  }
  html() {
    return this.container;
  }
  textI(value) {
    this.i.innerHTML = value;
  }
  getValue() {
    return this.input.getValue();
  }
  getValueErr() {
    return this.err.innerHTML;
  }
  setValue(value) {
    this.input.setValue(value);
  }
  setHtmlErr(value) {
    this.err.innerHTML = value;
  }
}

export { InputCommon };
