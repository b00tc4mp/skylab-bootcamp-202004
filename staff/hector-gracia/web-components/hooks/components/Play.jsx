function Play({gain, toRanking}){
    
    useEffect(() => {
        setTimeout(function(){
            toRanking();
        },3000);
    },[])
    

    return <button onClick={gain}>Click me</button>
}