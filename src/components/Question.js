import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10); // Initializes the state for the countdown

  // Sets up an effect that decrements timeRemaining every second
  useEffect(()=>{
    const timeout = setTimeout(()=>{setTimeRemaining(count=>count-1)
    },1000);

    return function clearTimer(){
      clearTimeout(timeout)
    }
    
  },[timeRemaining])

  if(timeRemaining<1){
    setTimeRemaining(10)
    onAnswered(false)
  }

  // Handles the button click, sets the remaining time and activates the callback
  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer back to 10 seconds
    onAnswered(isCorrect); // Callback function to send the answer status
  }

  const { id, prompt, answers, correctIndex } = question; // Destructures props for easier access

  // Renders the question, possible answers, and the timer
  return (
    <>
      <h1>Question {id}</h1> {/* Displays the question's identifier*/}
      <h3>{prompt}</h3> {/* Displays the question's prompt */}
      {answers.map((answer, index) => { // Maps through the answers array to render buttons
        const isCorrect = index === correctIndex; // Checks if the current answer is correct
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}> {/* Button that executes handleAnswer on click */}
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5> {/* Displays the countdown timer */}
    </>
  );
}

export default Question; // Exports the component for use in other parts of the application