require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveAllPetition = require('./retrieve-all-petitions')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')

describe('logic - retrieve petition', () => {

    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, _email, password, userId, workGroupName, workGroupId, petitionId, secondUserId

    beforeEach(() =>
        User.deleteMany()
            .then(() => WorkGroup.deleteMany())
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                petitionId = `petition-${random()}`
                workGroupName = "dreamTeam"
                _email = `ee-${random()}@mail.com`
            })
    )

    describe('when user already exists', () => {
        beforeEach(async () => {

            const user = await User.create({ name, surname, email, password })
            userId = user._id.toString()
            const secondUser = await User.create({ name, surname,email: _email, password })
            secondUserId = user._id.toString()
            const workGroup = await WorkGroup.create({ name: workGroupName, creator: userId, petitions: [{ user: secondUserId}]})
            workGroupId = workGroup._id.toString()

        })

        it('should succeed on correct user id', async () => {
            debugger
            const result = await retrieveAllPetition(workGroupId, userId)
            expect(result).to.not.be.undefined
            const workGroups = await WorkGroup.find()
            expect(workGroups.length).to.equal(1)
            const [workGroup] = workGroups
            const { petitions } = workGroup
            expect(petitions.length).to.equal(1)
            expect(petitions[0].user.toString()).to.equal(secondUserId)


        })


        it('should fail when user does not exist', () => {

            const userId = '5ed1204ee99ccf6fae798aaf'

            return retrieveAllPetition(workGroupId, userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId} not creator`)
                })
        })
        it('should fail when work group does not exist', () => {
            const workGroupId = '5ed1204ee99ccf6fae798aef'
            return retrieveAllPetition(workGroupId, userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)
                })
        })

    })
    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()

    })

    after(async ()=> await mongoose.disconnect)
})