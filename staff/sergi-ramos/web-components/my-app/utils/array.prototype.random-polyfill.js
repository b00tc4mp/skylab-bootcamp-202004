if (typeof Array.prototype.random === 'undefined')
    Array.prototype.random =  function (){ debugger
        return this[Math.floor(Math.random() * this.length)]
    }