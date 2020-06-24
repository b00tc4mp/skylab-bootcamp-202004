import React, { useState, useEffect } from "react";
// import "./Challenge.sass";
import Editor from "./Editor";
import { checkTest } from "code-this-client-logic";
import { savePossibleSolution, retrieveUser } from "code-this-client-logic";

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
  handleRetrieveCategory
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
    );
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
    const _solution = solutions.map(async currentSolution => {
      const _user = await retrieveUser(currentSolution.userId);
      currentSolution.user = _user
    })

    return Promise.all(_solution).then(result => setUsersSolution(result))
  };

  const isTestFailed = testStatus.status === "error";
  const isTestPassed = testStatus.status === "succes";

  return (
    <>
            <div className="title">{categoryName} {buttons}</div>
            <div className="widget">
                <div className="title">Code your answer</div>
                <Editor onChange={handleOnChange} initialCode={answer} />
            </div>


            <div className="widget widget--full">
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
                        <h5>Congratulations!</h5>
                        <button onClick={handleSavePossibleSolution}>
                          Share my solution
                        </button>
                      </>
                  )}

                </div>
                {!isTestPassed && <button className="run-test" onClick={runTests}>Run test</button>}
            </div>

            {userSolution && usersSolution && (

            <div class="widget widget--full">
                <div class="title">Other solutions</div>

                <div className="solutions-container">
                  {solutions.map(({ solution, user }) => (
                    <div className="challenge-solution">

                      <div className="challenge-avatar">
                        <img
                          src={`https://api.adorable.io/avatars/${user?._id}@adorable.png`}
                          alt={user?.name}
                          />
                        <span>{user?.name}</span>
                      </div>

                      <pre>
                        <code> {solution} </code>
                      <button>UP!</button>
                      </pre>
                    </div>

                  ))}
                </div>
               
            </div>
            )}


    </>
  )

  /*
  return (
    <div className="challenge">
      <h4>{description}</h4>

      <div className="challenge-editor">
        <Editor onChange={handleOnChange} initialCode={answer} />
      </div>

      <p>{difficulty}</p>
      <p>{tests}</p>

      {isTestFailed && (
        <div className="challenge-test-failure">
          <p>Expected: {`${testStatus.error.expected}`}</p>
          <p>Received: {`${testStatus.error.actual}`}</p>
          <p>Message: {testStatus.error.message}</p>
          <p>{testStatus.error.message.stack}</p>
        </div>
      )}

      {isTestPassed && (
        <div className="challenge-test-success">
          <h6>Congratulations!</h6>
          <button onClick={handleSavePossibleSolution}>
            Share my solution
          </button>
        </div>
      )}
      {!isTestPassed && <button onClick={runTests}>Run test</button>}

      {userSolution && (
        <div className="solutions-container">
          <h3>Other solutions</h3>

          {solutions.map(({ solution, userId }) => (
            <div className="challenge-solution">

              <div className="challenge-avatar">
                <img
                  src={`https://api.adorable.io/avatars/${userId}@adorable.png`}
                  alt={userId}
                  />
                <span>user name</span>
              </div>

              <pre>
                <code> {solution} </code>
              <button>UP!</button>
              </pre>
            </div>

          ))}
        </div>
      )}

    </div>
  );
  */
}
export default Challenge;



    
//  <div className="comment-container">
//   <div className="comments" >
//       <div  className="card">
//         <div  className="header">
//           <div  className="avatar" style="height: 50px; width: 50px;"><img  src={`https://api.adorable.io/avatars/${userId}@adorable.png`} alt={userId} /></div>
//           <span  className="displayName title">Name</span> 

//         <div  className="wrapper comment">
//               <pre>
//                 <code> {solution} </code>
//               </pre>
//               <button>UP!</button>
//         </div>
//       </div>
//     </div>
//   </div>