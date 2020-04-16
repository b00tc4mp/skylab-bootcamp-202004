var a = new ArrozConLeche( new Arroz(1, 2, 3), new Arroz('a', 'b', 'c', 'd'), new Arroz(true, true, false, false, false))

a.set(10, undefined, new Arroz('hola mundo'))

a.set(20, 20, 'hola mundo')

a.set(0, 0, undefined)

a.set(8, undefined, undefined)

a[2].push('2222')

console.dir(a)