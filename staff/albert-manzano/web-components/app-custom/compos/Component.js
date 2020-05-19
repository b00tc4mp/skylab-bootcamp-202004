class Component{
    constructor(template){
    this.contain = this.assemble(template);
    }
    assemble(template){
        const temp =document.createElement('div');

        temp.innerHTML = template;

        return temp.firstChild;
    }
}