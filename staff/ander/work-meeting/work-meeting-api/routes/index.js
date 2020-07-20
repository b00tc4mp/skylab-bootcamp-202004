const { env: { JWT_SECRET:SECRET } } = process

const { Router } = require('express')
const { registerUser, addReadBy, retrieveReadBy, authenticateUser,addMemberDepartment , addPetition , createDepartment,createMeeting,createSummary,createWorkGroup,retrieveDepartmentAll,retrievePetitionAll, retrieveWorkGroup,searchUser,searchWorkGroup,retrieveUser,updatePetition,updateSummary, updateUser , changeWorkGroup, retrieveWorkGroupPref} = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')
const { handleError } = require('../helpers')
const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()

api.post('/users', parseBody, registerUser)
api.post('/users/auth', parseBody, authenticateUser)
api.post('/department/addmem', verifyExtractJwt, parseBody, addMemberDepartment)
api.post('/petition', verifyExtractJwt, parseBody, addPetition)
api.post('/department',verifyExtractJwt, parseBody, createDepartment)
api.post('/meeting', verifyExtractJwt, parseBody, createMeeting)
api.post('/summary', verifyExtractJwt, parseBody, createSummary)
api.post('/workgroup', parseBody, createWorkGroup)
api.post('/readBy', parseBody, verifyExtractJwt, addReadBy)
api.get('/readBy', parseBody , retrieveReadBy)
api.get('/deparment/:workGroupId', retrieveDepartmentAll)
api.get('/petition/:workGroupId', verifyExtractJwt, retrievePetitionAll)
api.get('/workgroup',verifyExtractJwt, retrieveWorkGroup)

api.get('/users/:userId?', verifyExtractJwt, retrieveUser)
api.get('/users/search/:workGroupId', searchUser) //no tengo Id ni nada
api.get('/workgroup/search?', searchWorkGroup) 
api.patch('/users/update', verifyExtractJwt, parseBody, updateUser)
api.patch('/petition/update/', parseBody, updatePetition)
api.patch('/summary/update', parseBody, updateSummary)
api.patch('/workgroup/change', verifyExtractJwt, parseBody, changeWorkGroup)
api.get('/workgrouppref',verifyExtractJwt, retrieveWorkGroupPref)





/* api.get('/users/addMemberDepart?', parseBody, addMemberDepartment)

api.get('/users/:userId?', verifyExtractJwt,retrieveUser ) */


module.exports = {
    api
}