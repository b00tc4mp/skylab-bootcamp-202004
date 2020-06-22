require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/function')
const { utils: { call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (workspace) {

    const workspaceSchemized = {
        geoLocation: {
            coordinates: [workspace.location.longitude, workspace.location.latitude]
        },
        name: workspace.name,
        category: workspace.category.value,
        price: {
            amount: Number(workspace.price),
            term: workspace.term.value
        },
        phone: workspace.phone,
        address: {
            street: workspace.street,
            city: workspace.city,
            country: workspace.country
        },
        description: workspace.description,
        capacity: Number(workspace.capacity),
        features: {
            wifi: workspace.wifi,
            parking: workspace.parking,
            coffee: workspace.coffee,
            meetingRooms: workspace.meetingRooms
        }
    }


    return (async () => {
        try {
            const token = await this.storage.getItem('token')
            const headers = { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' }

            const result = await call(
                'POST',
                `${this.API_URL}/workspaces`,
                JSON.stringify(workspaceSchemized),
                headers
            )

            const { status, body } = result
            if (status === 201) return JSON.parse(body)
            else throw new Error('could not create workspace')
        } catch (error) {
            console.log(error) // TODO
        }
    })()
}.bind(context)