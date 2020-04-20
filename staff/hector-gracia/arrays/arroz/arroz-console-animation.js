function project(animation) {
    var projector = setInterval(function() {
        var view = animation.render()

        console.clear()
        console.log(view)
    }, 1000 / animation.fps);
    
    document.addEventListener('click', function() {
        clearInterval(projector)
    })
}
var poster = (function() {
    var message;
    var scene="";
    return {
        setMessage:function(string){
            message=Arroz.toAnimation(string);
        },
        render: function() {
            
            scene="";
            for(var i=0;i<5;i++){
                if(message.length<90){
                    for(var j=0;j<message.length;j++){
                        scene+=message[j][i];
                    }
                }else{
                    for(var j=0;j<90;j++){
                        scene+=message[j][i];
                    }
                }
                
                scene+=" \n";
            }
            message.translate();

            return scene;
        },
        fps: 3
    }  
})()