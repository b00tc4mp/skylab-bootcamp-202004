function person(name) {
    this.name=name
  
        toString= function() {
            return 'i am ' + name
        }
        
        setName= function(_name) {
            name = _name
        }
    }

debugger
var peter = new person('Peter')
var mary = newperson('Mary')
person.prototype.sex=function () {
    console.log("i need some sex" + this.name)
}
console.log(peter.toString())
peter.setName('John')
console.log(peter.toString())

console.log(mary.toString())
mary.setName('Anna')
console.log(mary.toString())