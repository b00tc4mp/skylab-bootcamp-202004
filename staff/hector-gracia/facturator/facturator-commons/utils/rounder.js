const Rounder={
    round(number,decimals){
        if(typeof number!=="number") throw new TypeError(number+" is not a number")
        if(typeof decimals==="undefined")//If not given decimals, round to an integer
        {
            return Math.round(number)
        }else{
            if(typeof decimals!=="number") throw new TypeError(decimals+" is not a number")
            if(decimals<0) throw new Error (decimals+" should be higher than 0")
            let places=1
            for(let i=0; i<decimals;i++){
                places*=10
            }
            return Math.round(number*places)/places
            }
    }
}
module.exports=Rounder