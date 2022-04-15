class Input {
  container = document.createElement("div");
  label = document.createElement("label");
  input = document.createElement("input");
  constructor(label, clInput, type, placeholder, name) {
    this.label.innerHTML = label;
    this.label.htmlFor = name;

    this.input.setAttribute("class", clInput);
    this.input.type = type;
    this.input.placeholder = placeholder;
    this.input.name = name;
    this.input.required = true;

    this.container.appendChild(this.label);
    this.container.appendChild(this.input);
  }

  html(){
      return this.container;
  }
  getValue() {
    return this.input.value;
  }
  setValue(value) {
    this.input.value = value;
  }
}

export{Input};
