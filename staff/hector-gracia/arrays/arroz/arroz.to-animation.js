'use strict'
Object.defineProperty(Arroz, 'toAnimation', {
    value: function(string) { 
        if(typeof string!=="string") throw new Error(string + "is not a string");
        var result=new Arroz();
        var col1=new Arroz("x","x","x","x","x");   
        var col2=new Arroz("x"," ","x"," "," "); 
        var col3=new Arroz("x"," ","x"," "," ");
        var col4=new Arroz("x"," ","x"," "," "); 
        var col5=new Arroz("x","x","x","x","x");  
        var a=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x"); 
        col2=new Arroz("x"," ","x"," ","x"); 
        col3=new Arroz("x"," ","x"," ","x"); 
        col4=new Arroz("x"," ","x"," ","x"); 
        col5=new Arroz(" ","x"," ","x"," ");  
        var b=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x"); 
        col2=new Arroz("x"," "," "," ","x"); 
        col3=new Arroz("x"," "," "," ","x"); 
        col4=new Arroz("x"," "," "," ","x"); 
        col5=new Arroz("x"," "," "," ","x");  
        var c=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");   
        col2=new Arroz("x"," "," "," ","x"); 
        col3=new Arroz(" ","x"," ","x"," "); 
        col4=new Arroz(" ","x"," ","x"," "); 
        col5=new Arroz(" "," ","x"," "," ");  
        var d=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");   
        col2=new Arroz("x"," ","x"," ","x"); 
        col3=new Arroz("x"," ","x"," ","x"); 
        col4=new Arroz("x"," ","x"," ","x"); 
        col5=new Arroz("x"," ","x"," ","x");  
        var e=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");   
        col2=new Arroz("x"," ","x"," "," "); 
        col3=new Arroz("x"," ","x"," "," "); 
        col4=new Arroz("x"," ","x"," "," "); 
        col5=new Arroz("x"," ","x"," "," ");  
        var f=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");   
        col2=new Arroz("x"," ","x"," ","x"); 
        col3=new Arroz("x"," ","x"," ","x"); 
        col4=new Arroz("x"," ","x"," ","x"); 
        col5=new Arroz("x"," ","x","x","x");  
        var g=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");
        col2=new Arroz(" "," ","x"," "," ");
        col3=new Arroz(" "," ","x"," "," ");
        col4=new Arroz(" "," ","x"," "," ");
        col5=new Arroz("x","x","x","x","x");
        var h=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x"," "," "," ","x");
        col2=new Arroz("x"," "," "," ","x");
        col3=new Arroz("x","x","x","x","x");
        col4=new Arroz("x"," "," "," ","x");
        col5=new Arroz("x"," "," "," ","x");
        var i=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x"," "," ","x"," ");
        col2=new Arroz("x"," "," "," ","x");
        col3=new Arroz("x"," "," "," ","x");
        col4=new Arroz("x"," "," "," ","x");
        col5=new Arroz("x","x","x","x"," ");
        var j=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");
        col2=new Arroz(" "," ","x"," "," ");
        col3=new Arroz(" ","x"," ","x"," ");
        col4=new Arroz(" ","x"," ","x"," ");
        col5=new Arroz("x"," "," "," ","x");
        var k=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");
        col2=new Arroz(" "," "," "," ","x");
        col3=new Arroz(" "," "," "," ","x");
        col4=new Arroz(" "," "," "," ","x");
        col5=new Arroz(" "," "," "," ","x");
        var l=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");   
        col2=new Arroz(" ","x"," "," "," "); 
        col3=new Arroz(" "," ","x"," "," "); 
        col4=new Arroz(" ","x"," "," "," "); 
        col5=new Arroz("x","x","x","x","x");  
        var m=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");   
        col2=new Arroz(" ","x"," "," "," "); 
        col3=new Arroz(" "," ","x"," "," "); 
        col4=new Arroz(" "," "," ","x"," "); 
        col5=new Arroz("x","x","x","x","x");  
        var n=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");   
        col2=new Arroz("x"," "," "," ","x"); 
        col3=new Arroz("x"," "," "," ","x"); 
        col4=new Arroz("x"," "," "," ","x"); 
        col5=new Arroz("x","x","x","x","x");  
        var o=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");   
        col2=new Arroz("x"," ","x"," "," "); 
        col3=new Arroz("x"," ","x"," "," "); 
        col4=new Arroz("x"," ","x"," "," "); 
        col5=new Arroz("x","x","x"," "," ");  
        var p=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz(" ","x","x","x"," ");   
        col2=new Arroz("x"," "," "," ","x"); 
        col3=new Arroz("x"," ","x"," ","x"); 
        col4=new Arroz("x"," "," ","x","x"); 
        col5=new Arroz(" ","x","x","x","x");  
        var q=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz(" ","x","x","x","x");   
        col2=new Arroz("x"," ","x"," "," "); 
        col3=new Arroz("x"," ","x"," "," "); 
        col4=new Arroz("x"," "," ","x"," "); 
        col5=new Arroz(" ","x"," "," ","x");  
        var r=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz(" ","x"," "," ","x");   
        col2=new Arroz("x"," ","x"," ","x"); 
        col3=new Arroz("x"," ","x"," ","x"); 
        col4=new Arroz("x"," ","x"," ","x"); 
        col5=new Arroz("x"," "," ","x"," ");  
        var s=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x"," "," "," "," ");   
        col2=new Arroz("x"," "," "," "," "); 
        col3=new Arroz("x","x","x","x","x"); 
        col4=new Arroz("x"," "," "," "," "); 
        col5=new Arroz("x"," "," "," "," ");  
        var t=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x","x");   
        col2=new Arroz(" "," "," "," ","x"); 
        col3=new Arroz(" "," "," "," ","x"); 
        col4=new Arroz(" "," "," "," ","x"); 
        col5=new Arroz("x","x","x","x","x");  
        var u=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x"," "," "," ");   
        col2=new Arroz(" "," ","x","x"," "); 
        col3=new Arroz(" "," "," "," ","x"); 
        col4=new Arroz(" "," ","x","x"," "); 
        col5=new Arroz("x","x"," "," "," ");  
        var v=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x","x","x","x"," ");   
        col2=new Arroz(" "," "," "," ","x"); 
        col3=new Arroz(" "," ","x","x"," "); 
        col4=new Arroz(" "," "," "," ","x"); 
        col5=new Arroz("x","x","x","x"," ");  
        var w=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x"," "," "," ","x");   
        col2=new Arroz(" ","x"," ","x"," "); 
        col3=new Arroz(" "," ","x"," "," "); 
        col4=new Arroz(" ","x"," ","x"," "); 
        col5=new Arroz("x"," "," "," ","x");  
        var x=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x"," "," "," "," ");   
        col2=new Arroz(" ","x"," "," "," "); 
        col3=new Arroz(" "," ","x","x","x"); 
        col4=new Arroz(" ","x"," "," "," "); 
        col5=new Arroz("x"," "," "," "," ");  
        var y=new Arroz(col1,col2,col3,col4,col5);
        col1=new Arroz("x"," ","x"," ","x");   
        col2=new Arroz("x"," ","x","x","x"); 
        col3=new Arroz("x"," ","x"," ","x"); 
        col4=new Arroz("x","x","x"," ","x"); 
        col5=new Arroz("x"," ","x"," ","x");  
        var z=new Arroz(col1,col2,col3,col4,col5);
        var blank= new Arroz(" "," "," "," "," ");
        for(var cont=0;cont<string.length;cont++){
            switch (string[cont]) {
                case "a":
                result.concat(a);
                break;
                case "b":
                result.concat(b);
                break;
                case "c":
                result.concat(c);
                break;
                case "d":
                result.concat(d);
                break;
                case "e":
                result.concat(e);
                break;
                case "f":
                result.concat(f);
                break;
                case "g":
                result.concat(g);
                break;
                case "h":
                result.concat(h);
                break;
                case "i":
                result.concat(i);
                break;
                case "j":
                result.concat(j);
                break;
                case "k":
                result.concat(k);
                break;
                case "l":
                result.concat(l);
                break;
                case "m":
                result.concat(m);
                break;
                case "n":
                result.concat(n);
                break;
                case "o":
                result.concat(o);
                break;
                case "p":
                result.concat(p);
                break;
                case "q":
                result.concat(q);
                break;
                case "r":
                result.concat(r);
                break;
                case "s":
                result.concat(s);
                break;
                case "t":
                result.concat(t);
                break;
                case "u":
                result.concat(u);
                break;
                case "v":
                result.concat(v);
                break;
                case "w":
                result.concat(w);
                break;
                case "x":
                result.concat(x);
                break;
                case "y":
                result.concat(y);
                break;
                case "z":
                result.concat(z);
                break;
                case " ":
                result.push(blank)
                result.push(blank)
                result.push(blank)
                break;
            }
            result.push(blank);
        }
        result.push(blank);
        return result;
    },
    enumerable: false,
    writable: true
});
