import { useState} from 'react';


let last_stage_counter =100;
let has_answered = false;

function checkText(e, handleAnswer)
{

  // let d = document.getElementById("write-box").value.toLowerCase();
  // e = e.toLowerCase();

  // if (d === e)
  // {
  //   document.querySelector("#write-box").classList.add('write-right-answer');
  //   console.log("right answer");
  //   has_answered = true;

  //   handleAnswer(true);
  // }
  // // console.log("text was added " + d + ":" + e);

}

function answer(e, right_answer, handleAnswer, setShowAns)
{
  let input_answer = document.getElementById("write-box").value.toLowerCase();
  // console.log("answered " + input_answer);
  // right_answer = right_answer.toLowerCase();

  if(e.key == 'Enter' &&  input_answer != ""  && !has_answered) 
  { 
    has_answered = true;

    console.log("im here");

    if (input_answer.trim() === right_answer.toLowerCase())
    {  
        document.querySelector("#write-box").classList.add('write-right-answer');
        // has_answered = true;
        var text = document.getElementById('write-box');
        text.value = right_answer;
        handleAnswer(true);

    }
    else
    {
      document.querySelector("#write-box").classList.add('write-wrong-answer'); 

      setShowAns(true);
      handleAnswer(false);
    }
  }
}

export default function(props){
  let counter = props.counter;
  let pieces = props.pieces;
  let handleAnswer = props.handleAnswer;
  let stageCounter = props.stageCounter;

  const [showAns, setShowAns] = useState(false); 
  var [que, ans] = pieces[counter].split(";");
  

  if (stageCounter != last_stage_counter)
  {  
    has_answered = false; 

    last_stage_counter = stageCounter;
    if (document.getElementById("write-box")){
      document.querySelector("#write-box").classList.remove('write-wrong-answer');
      document.querySelector("#write-box").classList.remove('write-right-answer');
    
    var text = document.getElementById('write-box');
    text.value = '';
    setShowAns(false);

  }
  }

  return (
    <> 
      <> 
      <div className='write-question'>
      <h1>{que}</h1>

      <input autoFocus id="write-box" autoComplete="off" 
      placeholder='Insert text'
      // onChange={() => checkText(ans, handleAnswer)} 
      onKeyDown={(e) => answer(e, ans, handleAnswer, setShowAns)} />
      <h1>{showAns ? (
      <>
      {ans}
      </>
    ) : (
      <>
         
      </>
    )}
    </h1>
      </div>
      </>
    
    </>
  )


}