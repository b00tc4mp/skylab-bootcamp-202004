import React, { useState } from "react";
import "./Challenge.sass";
import Editor from "./Editor";
import { checkTest } from "code-this-client-logic";
import { savePossibleSolution } from "code-this-client-logic";

function Challenge({
  description,
  difficulty,
  tests,
  initialCode,
  _id: challengeId,
  user,
  solutions,
}) {
  const userSolution = solutions.find(
    (solution) => solution.userId === user.id
  );

  const [answer, setAnswer] = useState(userSolution?.solution || initialCode);
  const [testStatus, setTestStatus] = useState({
    status: "initial",
    error: null,
  });

  const handleSavePossibleSolution = () => {
    savePossibleSolution(user.id, challengeId, answer).then(() =>
      console.log("challenge saved")
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

  const isTestFailed = testStatus.status === "error";
  const isTestPassed = testStatus.status === "succes";

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

      <div></div>
    </div>
  );
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