//Para sacar las noticias de covid19
function dnavarra(callback) {
    var xhr = new XMLHttpRequest()
    //Llama a la web desde el proxy
    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.diariodenavarra.es/tags/temas/coronavirus_navarra.html` )
    

    xhr.onload = function () {
        //Metodo para sacar información de la web
        const parser = new DOMParser()
        
        const doc = parser.parseFromString(this.responseText, 'text/html');
        
        let results = doc.querySelectorAll('.padd-col');//Unidad mayor de noticia individual
        
        const data = []
        
        for(let i=0;i<results.length;i++){
            const title=results[i].querySelector("a.ft-16").innerText;//Sacar el titulo y enlace de cada unidad
            const link=results[i].querySelector("a").href;
            let body;
            if(results[i].querySelector("p")){//Algunas noticias son solo titular así que hice esta comprobación
                body=results[i].querySelector("p").innerText;
            }
            data.push([title,link,body]);
        }
        
        callback(undefined, data);//Callback para poder sacar la informacion en un metodo asincrono
    }

    xhr.onerror = function(error) {
        callback(new Error('network error'))
    }

    xhr.send()
}
