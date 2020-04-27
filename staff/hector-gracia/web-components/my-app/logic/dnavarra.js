//Para sacar las noticias de covid19
function dnavarra(callback) {
    var xhr = new XMLHttpRequest()
    
    xhr.open( 'GET', `https://skylabcoders.herokuapp.com/proxy?url=https://www.diariodenavarra.es/tags/temas/coronavirus_navarra.html` )
    

    xhr.onload = function () {
        const parser = new DOMParser()
        

        const doc = parser.parseFromString(this.responseText, 'text/html');
        
        let results = doc.querySelectorAll('.padd-col');
        

        const data = []
        
        for(let i=0;i<results.length;i++){
            const title=results[i].querySelector("a.ft-16").innerText;
            const link=results[i].querySelector("a").href;
            let body;
            if(results[i].querySelector("p")){
                body=results[i].querySelector("p").innerText;
            }
            
            data.push([title,link,body]);
            
            
        }
        
        callback(undefined, data)
    }

    xhr.onerror = function(error) {
        callback(new Error('network error'))
    }

    xhr.send()
}
