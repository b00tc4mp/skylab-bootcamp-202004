function setTimeoutPromised(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis))  
}

setTimeoutPromised(1000).then(() => console.log('hola mundo'))