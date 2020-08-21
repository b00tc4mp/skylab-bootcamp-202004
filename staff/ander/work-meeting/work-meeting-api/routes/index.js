const { env: { JWT_SECRET: SECRET } } = process

const { Router } = require('express')
const {
    //User-oriented
    registerUser,
    authenticateUser,
    searchUser,
    retrieveUser,
    //department-oriented
    addMemberDepartment,
    retrieveDepartMembers,
    createDepartment,
    retrieveDepartments,
    //summary-oriented
    createSummary,
    retrieveSummaries,
    retrieveSummarys,
    updateSummary,
    addMemberSummary,
    addDepartmentSummary,
    retrieveSummaryMembers,
    //workGroup-oriented
    createWorkGroup,
    retrieveWorkGroups,
    searchWorkGroups,
    changeWorkGroup,
    retrieveWorkGroupPref,
    retrieveWorkGroup,
    //readBy-oriented
    addReadBy,
    retrieveReadBy,
    //petition-oriented
    addPetition,
    retrieveAllPetitions,
    updatePetition,
    //meeting-oriented
    createMeeting,
    retrieveMeetings
} = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierExtractor } = require('../middlewares')


const { handleError } = require('../helpers')

const parseBody = bodyParser.json()
const verifyExtractJwt = jwtVerifierExtractor(SECRET, handleError)

const api = new Router()
//user-oriented
api.post('/users', parseBody, registerUser)
api.post('/users/auth', parseBody, authenticateUser)
api.get('/users/search/:workGroupId/:query?', searchUser)
api.get('/users/:userId?', verifyExtractJwt, parseBody, retrieveUser)
//department-oriented
api.post('/department', verifyExtractJwt, parseBody, createDepartment)
api.post('/department/addMember', parseBody, addMemberDepartment)
api.get('/department/:workGroupId', verifyExtractJwt, retrieveDepartments)
api.get('/departmentMembers/:workGroupId/:departmentId', retrieveDepartMembers)
//summary-oriented
api.post('/summary/addMember', parseBody, addMemberSummary)
api.post('/summary/addDepartment', parseBody, addDepartmentSummary)
api.post('/summary', verifyExtractJwt, parseBody, createSummary)
api.get('/summarys/:meetingId', verifyExtractJwt, retrieveSummarys)
api.get('/summaries/:workGroupId', verifyExtractJwt, retrieveSummaries)
api.get('/summary/members/:summaryId', retrieveSummaryMembers)
api.patch('/summary/update', parseBody, updateSummary)
//workGroup-oriented
api.post('/workgroup', verifyExtractJwt, parseBody, createWorkGroup)
api.get('/workgroups', verifyExtractJwt, retrieveWorkGroups)
api.get('/workgroup/search?', verifyExtractJwt, searchWorkGroups)
api.get('/workGroupPref', verifyExtractJwt, retrieveWorkGroupPref)
api.get('/workGroup/:workGroupId', retrieveWorkGroup)
api.patch('/workGroupPref', verifyExtractJwt, parseBody, changeWorkGroup)
//readBy-oriented
api.post('/readBy', verifyExtractJwt, parseBody, addReadBy)
api.get('/readBy/:summaryId', retrieveReadBy)
//petitions-oriented
api.post('/petition', verifyExtractJwt, parseBody, addPetition)
api.get('/petition/:workGroupId', verifyExtractJwt, retrieveAllPetitions)
api.patch('/petition', parseBody, updatePetition)
//meeting-oriented
api.post('/meeting', verifyExtractJwt, parseBody, createMeeting)
api.get('/meeting/:workGroupId', verifyExtractJwt, parseBody, retrieveMeetings)




module.exports = {
    api
}