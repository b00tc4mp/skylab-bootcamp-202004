function keepSafe(secret) {
    __secret__ = secret
}

keepSafe('me gusta el chocolate de limon')

console.log(window.__secret__) // NOT safe!