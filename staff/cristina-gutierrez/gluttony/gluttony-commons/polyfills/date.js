Date.prototype.toHumanFormat = function() {
    const day = this.getDate();
    const month = this.getMonth();
    const year = this.getFullYear();
    const hours = this.getHours().toString().padStart(2, "0");
    const minutes = this.getMinutes().toString().padStart(2, "0");
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;  
}