//Clase componente sobre la que heredan todos los componentes de la web
class Component{
    //Constructor que crea el container del componente
    constructor(template){
        this.container=this.mount(template);
    }
    mount(template){
        const temp= document.createElement("div");
        temp.innerHTML=template;
        return temp.firstChild;
    }
}