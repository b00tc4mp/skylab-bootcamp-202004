function hello(from, to) {
    console.log(from + ': Hello, ' + to + '!')
}

hello('Peter', 'Anna')

hello.call(undefined, 'Peter', 'Anna')

hello.apply(undefined, ['Peter', 'Anna'])