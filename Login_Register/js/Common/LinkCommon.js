class LinkCommon{
    a = document.createElement("a");
    i = document.createElement("i");
    constructor(href,classA,classI,html){
        this.a.href = href;
        // this.a.classList.add(classA);
        this.a.setAttribute("class",classA);
        this.i.setAttribute("class",classI);
        // this.i.classList.add(classI);
        this.a.innerHTML = html;
        this.a.insertAdjacentElement("afterbegin",this.i);
        
    }
    html(){
        return this.a;
    }
}

export{LinkCommon};