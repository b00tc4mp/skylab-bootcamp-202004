class Component {
    constructor(template){
        this.container = this.mont(template)
    }

    mont(template){
        const temp = document.createElement('div');
        temp.innerHTML = template;
        return temp.firstChild;
    }
}