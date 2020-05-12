const creatFwitterArray= (fwitter)=>{
    const result = []
        fwitter.map(({idUser, nameUser,surnameUser,fwitter}) =>{
            fwitter.map(({id, name,fwitt})=>{
                fwitt.map(({message,date,_date})=>{
                    if(_date) result.push({idUser,nameUser,surnameUser,name,message,date,_date})
                })
            })
        })
        
        result.sort(function(a, b) {
            return parseInt(b._date) - parseInt(a._date);
        }); 
        result.length = 20; 
    return result                            
} 