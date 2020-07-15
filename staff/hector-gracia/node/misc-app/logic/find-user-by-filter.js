const path=require("path");
const fs=require("fs");
/**
 * Finds all the users saved in the data/users directory whose parameters are equal to those of the specified filter
 * @param {object} filter object that the filter that will be aplied when finding
 * @param {function} callback function called after finishing. Returns an error if has been any or an array with all the users that match the criteria
 * @throws {TypeError} throws an error if filter is not an object
 * @throws {TypeError} throws an error if the callback is not a function
 */
function findUserByFilter(filter,callback) {
    //Comprueba los tipos de los parametros
    if(typeof filter!=="object") throw new TypeError(filter+" is not an object");
    if(typeof callback!=="function") throw new TypeError(callback+" is not a function");
    const results=[];
    
    //Va al directorio de usuarios
    fs.readdir(path.join(__dirname,"..","data","users"),(error,allFiles)=>{
        if(error) return callback(error);
        //Se centra solo en los ficheros que son JSON
        allFiles=allFiles.filter(file => path.extname(file) === '.json');
        if(!allFiles.length) return callback(null,results);

        checkFile(allFiles,0);
    })
    //Función recursiva para comprovar el valor del usuario guardado en los ficheros
    function checkFile(allFiles,index) {
        if(index<allFiles.length)
        {
            fs.readFile(path.join(__dirname,"..","data","users",allFiles[index]),(error,data)=>{
                if(error) return callback(error);
                const user= JSON.parse(data);
                const keys= Object.keys(filter);
                //Comprueba todas las propiedades del filtro y si alguna de ellas no coincide macthes=false
                let matches=true;
                for(let i=0;i<keys.length && matches;i++){
                    const key= keys[i];
                    matches=user[key]=== filter[key]
                }
                //Si cumple los requisitos se añade ese usuario al resultado
                if(matches==true){
                    results.push(user);
                }
                index++;
                checkFile(allFiles,index)
            })
        }else{
            //Cuando ha recorrido todo el directorio devuelve los resultados
            callback(null,results);
        }
    }
}

module.exports=findUserByFilter;