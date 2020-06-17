require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (token, workspaceId, workspace) {
    String.validate.notVoid(token)
    console.log(workspace.image1)
    let data = new FormData()
    data.append("image", {
        name: "image1",
        type: "image/jpeg",
        uri: workspace.image1.uri,
    })

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }

    return (async () => {
        try {
            const result = await call(
                'POST',
                `${this.API_URL}/upload/${workspaceId}`,
                data,
                headers
            )
            const { status, body } = result

            if (status === 200) {
                return true
            }
            else throw new Error('could not create workspace')
        } catch (error) {
            console.log(error) // TODO
        }

    })()
}.bind(context)

// const validationSchema = Yup.object().shape({
//     image1: Yup.object().required().nullable().label('At least one Image'),
//     image2: Yup.object().nullable().label('Image'),
//     image3: Yup.object().nullable().label('Image'),
//     workspaceName: Yup.string().min(1).required().label('Workspace Name'),
//     price: Yup.number().required().min(1).max(10000).label('Price'),
//     term: Yup.object().required().nullable().label('Term'),
//     category: Yup.object().required().nullable().label('Category'),
//     street: Yup.string().required().label('Street'),
//     city: Yup.string().required().label('City'),
//     country: Yup.string().required().label('Country'),
//     phone: Yup.string().required().label('Phone'),
//     description: Yup.string().required().max(200).label('Description'),
//     capacity: Yup.number().required().label('Capacity'),
//     location: Yup.object().label('Location'),
// })