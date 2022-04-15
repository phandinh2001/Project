class ButtonCommon{
    button = document.createElement("button");

    constructor(cl,type,html){
        this.button.classList.add(cl);
        this.button.type = type;
        this.button.innerHTML = html;
    }
    html(){
        return this.button;
    }
}

export{ButtonCommon};