import React, { useState } from 'react'
import './Challenge.sass'
import Editor from './Editor'
import { checkTest } from 'code-this-client-logic'


function Challenge({description, difficulty, tests, initialCode }) {

  const [answer, setAnswer] = useState(initialCode)
  const [testStatus, setTestStatus] = useState({
    status: 'initial',
    error: null
  })

  const runTests = () => {
    checkTest(answer, tests, _testStatus => {
      if (_testStatus) {
        setTestStatus({
          status: 'error',
          error: _testStatus
        })
      } else {
        setTestStatus({
          status: 'succes',
          error: null
        })
      }
    })
  }

  const handleOnChange = (event, value) => {
    setAnswer(value)
  }

  const isTestFailed = testStatus.status === 'error'
  const isTestPassed = testStatus.status === 'succes'


   return <div className="challenge">
       <h4>{description}</h4>

       <div className="challenge-editor">
          <Editor onChange={handleOnChange} initialCode={answer}/>
       </div>

       <p>{difficulty}</p>
       <p>{tests}</p>

       {isTestFailed && (
        <div className='challenge-test-failure'>
          <p>Expected: {`${testStatus.error.expected}`}</p>
          <p>Received: {`${testStatus.error.actual}`}</p>
          <p>Message: {testStatus.error.message}</p>
          <p>{testStatus.error.message.stack}</p>
        </div>
       )}

      {isTestPassed && (
      <div className='challenge-test-success'>
        <h6>Congratulations!</h6>
        <button>Share my solution</button>
      </div>
      )}
      {!isTestPassed && (
       <button onClick={runTests}>Run test</button>
      )}
       <div>
       </div>
 </div>

} 
export default Challenge