import {useEffect, useState} from 'react';



export default function FlashCard(props) {
  var counter = props.counter;
  let pieces = props.pieces;
  
  const [showAns, setShowAns] = useState(false); 

  let term = pieces[counter].split(";");
  const a1 = term[0];
  const q1 = term[1];

  useEffect(() => {

    setShowAns(false);
    console.log("me");
  },[counter]);

  return (
    <> 
    <h1>{a1}</h1>
    <h1 onClick={() => setShowAns(!showAns)}>{showAns ? (
      <>
      {q1}
      </>
    ) : (
      <>
         ?
      </>
    )}
    </h1>
    
    <h1></h1>
    <button onClick={() => setShowAns(!showAns)}>
      {showAns ? ("Hide Answer") : ("Show Answer")}
      </button>
    <h1></h1>

    </>
  )
}