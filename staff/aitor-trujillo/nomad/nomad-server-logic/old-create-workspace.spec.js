require('dotenv').config()

const { TEST_MONGODB_URL: MONGODB_URL } = process.env

const createWorkspace = require('./create-workspace')
const { random } = Math
const { expect } = require('chai')
require('nomad-commons/polyfills/json')
const { mongoose, models: { Workspace } } = require('nomad-data')

describe('logic - create workspace', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let workspaceRandomized = {}
    let userName, surname, email, password, userId

    beforeEach(() =>
        Workspace.deleteMany()
            .then(() => {
                workspaceRandomized = {
                    name: `name-${random()}`,
                    price: { amount: random() + 100, term: 'month' },
                    address: { street: `${random()} st`, city: `${random()} city`, country: `${random()} country` },
                    geoLocation: { coordinates: [random(), random()] },
                    // timetable = `timetable-${random()}`
                    photos: [`photo-${random()}`],
                    phone: `phone-${random()}`,
                    features: { wifi: '100mb', parking: `km-${random()}`, coffee: true, meetingRooms: random() },
                    description: `description-${random()}`,
                    capacity: random(),
                }
            })
            .then(() => {
                return User.deleteMany()
                    .then(() => {
                        userName = `name-${random()}`
                        surname = `surname-${random()}`
                        email = `e-${random()}@mail.com`
                        password = `password-${random()}`
                    })
            })
    )



    describe('when user exists', () => {
        beforeEach(() =>
            User.create({ name: userName, surname, email, password })
                .then(user => userId = user.id)
        )

        it('should succeed on correct workspace inputs', () =>
            createWorkspace(userId, workspaceRandomized)
                .then(result => expect(result).to.be.undefined)
                .then(() => Workspace.find().lean())
                .then(([workspace]) => {
                    expect(workspace).to.exist;

                })
        )


        it('should fail on wrong password', () => {
            password += 'wrong-'

            return authenticateUser(email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`wrong password`)
                })
        })
    })

    it('should fail when user does not exist', () =>
        authenticateUser(email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            })
    )

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})