import React, { useState, useEffect } from "react";
// import "./Challenge.sass";
import Editor from "./Editor";
import { checkTest } from "code-this-client-logic";
import { savePossibleSolution, retrieveUser } from "code-this-client-logic";
import MarkdownIt from 'markdown-it'
const mdParser = new MarkdownIt();

function Challenge({
  description,
  difficulty,
  tests,
  buttons,
  initialCode,
  categoryName,
  _id: challengeId,
  user,
  solutions,
  handleRetrieveCategory,
  score
}) {
  const getUserSolution = () => solutions.find(
    (solution) => solution.userId === user.id
  );

  const userSolution = getUserSolution()

  const [answer, setAnswer] = useState(userSolution?.solution || initialCode);
  const [usersSolution, setUsersSolution] = useState(null);
  const [testStatus, setTestStatus] = useState({
    status: "initial",
    error: null,
  });

  useEffect(() => {
    const _userSolution = getUserSolution()
    setAnswer(_userSolution?.solution || initialCode)
    setTestStatus({
      status: "initial",
      error: null
    })
    getUsersSolution()
  }, [challengeId, categoryName, solutions])

  const handleSavePossibleSolution = () => {
    savePossibleSolution(user.id, challengeId, answer).then(() =>
    handleRetrieveCategory()
    ).catch(error => {});
  };

  const runTests = () => {
    checkTest(answer, tests, (testError) => {
      if (testError) {
        setTestStatus({
          status: "error",
          error: testError,
        });
      } else {
        setTestStatus({
          status: "succes",
          error: null,
        });
      }
    });
  };

  const handleOnChange = (event, value) => {
    setAnswer(value);
  };

  const getUsersSolution = async () => {
    if (!userSolution) return null
      const _solutions = solutions.map(currentSolution => {
      return retrieveUser( localStorage.token, currentSolution.userId).then(_user => {
        currentSolution.user = _user
        return currentSolution
      }).catch(() => {
        return currentSolution
      })
    })

    return Promise.all(_solutions).then(result => setUsersSolution(result))

  };

  const isTestFailed = testStatus.status === "error";
  const isTestPassed = testStatus.status === "succes";

  return (
    <>
            <div className="dashboard__header">
              <span>{categoryName}</span>
              <span>{buttons}</span>
              <span className={difficulty?.toLowerCase()}>{difficulty}</span>
            </div>

            <div className="dashboard__widget dashboard__widget--full">
                <div className="title">Description</div>
                <div className="dashboard__widget--content" dangerouslySetInnerHTML={{__html: mdParser.render(description)}}/>
            </div>

            <div className="dashboard__rows">
            <div className="dashboard__widget">
                <div className="title">Code your answer</div>
                <Editor onChange={handleOnChange} initialCode={answer} />
            </div>
            <div className="dashboard__widget">
                <div className="title">Tests to pass</div>
                <div className={`test test--${testStatus.status}`}>
                  <pre>
                    <code>
                    {tests}
                    </code>
                  </pre>
                  
                  {isTestFailed && (
                      <>
                        <hr />
                        <p>Expected: {`${testStatus.error.expected}`}</p>
                        <p>Received: {`${testStatus.error.actual}`}</p>
                        <p>Message: {testStatus.error.message}</p>
                        <p>{testStatus.error.message.stack}</p>
                      </>
                  )}

                  {isTestPassed && (
                      <>
                        <hr />
                        <h5>Congratulations! + {score}</h5>
                      
                      </>
                  )}

                </div>

                {!userSolution ? (
                  <>
                  {!isTestPassed && <button className="run-test" onClick={runTests}>Run test</button>}
                  {isTestPassed && <button className="run-test" onClick={handleSavePossibleSolution}>
                            Share my solution
                          </button>}
                  </>
                ): (
                   <h4>Congratulations!</h4>
                )}

            </div>
            </div>


            {userSolution && usersSolution && (

            <div class="dashboard__widget dashboard__widget--comments">
                <div class="title">Other solutions</div>

                <div className="solutions-container">
                  {solutions.map(({ solution, user }) => (
                    <div className="challenge-solution">

                      <div className="challenge-avatar">
                        <img
                          src={`https://api.adorable.io/avatars/${user?._id}@adorable.png`}
                          alt={user?.name}
                          />
                        <span>{user?.name || 'Guest'}</span>
                      </div>

                      <pre>
                        <code> {solution} </code>
                      </pre>
                    </div>

                  ))}
                </div>
               
            </div>
            )}
    </>
  )
}
export default Challenge;


