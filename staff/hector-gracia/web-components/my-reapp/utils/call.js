//Lo del call()
//Funcion que llama con a la api directamente

function call(method,url,body,headers,callback){
    let xhr= new XMLHttpRequest();

    xhr.open(method,url);

    if(headers){
        for ( const key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }

    xhr.onload=function (){
        callback(undefined,this.status,this.responseText)
    }
    xhr.onerror=function(error){
        callback(new Error("Network error"));
    }
    
    xhr.send(body ? body : undefined) 
}