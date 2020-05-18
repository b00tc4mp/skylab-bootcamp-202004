class Components { 

        constructor(template){  
            this.container = this.mount(template)
        }
        mount(template){
            const temp = document.createElement('div')

            temp.innerHTML = template

            return temp.firstChild
        }
}