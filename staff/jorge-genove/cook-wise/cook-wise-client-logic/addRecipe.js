require('cook-wise-commons/polyfills/string')
const context = require('./context')
const { utils: { Email, call } } = require('cook-wise-commons')


module.exports = function (nameRecipe,authorRecipe,description,time,ingredients,token) {debugger
    String.validate(nameRecipe)
    String.validate(authorRecipe)
    String.validate(description)

    return (async () => {
     
        const token =  await this.storage.getItem('TOKEN')
   
    const res = await call(
        'POST',
        `${this.API_URL}/recipes`,
        JSON.stringify({name :nameRecipe, author: authorRecipe, description,time, ingredients,token}),
        { 'Content-type': 'application/json' ,'Authorization': `Bearer ${token}`  }
    )

            if (res.status === 201) return

            const { error } = JSON.parse(res.body) 
           

            throw new Error(error)
        })()
}.bind(context)