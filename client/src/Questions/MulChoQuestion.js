// import {useEffect, useState} from 'react';

let has_answered = false;
let last_stage_counter =100;
let real_ans_list = [0,1,2,3];

let current_answer=0, right_answer=0;

function answered()
{
  for (let i =0;i<4; i++)
  {
    if (document.getElementById("ans"+i)!= null)
    {
      // let ele = document.getElementById("ans"+i)
      // ele.style.transition="color 0s";
      document.querySelector("#ans" + i).classList.add('disabled-li');
      // ele.style.color = "rgb(200, 200, 200)";
      // ele.style.borderColor = "rgb(200, 200, 200)";
    }
  }}

function generate_answers_list(a1, a2, a3, a4)
{
  var rand_ind = Math.floor(Math.random() * (2*3*4));
  var org = [a1, a2, a3, a4]; 
  var result =[];
  var facs =[1,1,2,6];

  for (const v of [1,2,3,4])
  {
    
    var fac = facs[org.length-1];
    var cur_ind = Math.floor(rand_ind/fac);
    // console.log("rand_ind: " + rand_ind + " fac: " + fac);
    result.push(org[cur_ind]);
    org.splice(cur_ind, 1)
    rand_ind = rand_ind % fac;
    
  }
  
  return result;
}

function check_answer(answer_ind, right_answer_ind, handleAnswer)
{
  if (!has_answered && right_answer_ind != undefined){
    answered();
    // console.log("here " + right_answer_ind);
    document.querySelector("#ans" + right_answer_ind).classList.remove('disabled-li');
    document.querySelector("#ans" + right_answer_ind).classList.add('mc-right-answer');
    has_answered = true;
    if (answer_ind === right_answer_ind) 
    {
      console.log("answered true");
      handleAnswer(true);
      return true;
    }
    else 
    {
      document.querySelector("#ans" + answer_ind).classList.add('mc-wrong-answer');
      document.querySelector("#ans" + answer_ind).classList.remove('disabled-li');
      console.log("answered false");
      handleAnswer(false);

      return false;

    }
  }
}

function key_pressed(event, ans_ind, handleAnswer)
{
  // console.log("got click " +event.key);
    if (event.key == '1')
      check_answer(0, right_answer, handleAnswer);
    if (event.key == '2')
      check_answer(1, right_answer, handleAnswer);
    if (event.key == '3')
      check_answer(2, right_answer, handleAnswer);
    if (event.key == '4')
      check_answer(3, right_answer, handleAnswer);
}

export default function MulChoQuestion(props) {
  var counter = props.counter;
  let handleAnswer = props.handleAnswer;
  let pieces = props.pieces;
  let stageCounter = props.stageCounter;


  has_answered = false;
  // props.handleAnswer(true);

  var [que, ans] = pieces[counter].split(";");
  if (last_stage_counter != stageCounter)
  {
      
  
  document.addEventListener('keydown', 
  (event) => {key_pressed(event, ans_ind, handleAnswer)});

    last_stage_counter = stageCounter;
  var [i0, i1,i2,i3] = [0, 1,2,3];
  // counter = 14;
  if (counter >= pieces.length - 3) 
  {
    [i0, i1,i2,i3] = [-3, -2,-1,0];
  // console.log("muchars " + counter+i0 + " : " + counter+i1 + " : " + counter+i2 + " : " + counter+i3 + " : " )

  }
  var f0 = pieces[counter+i0].split(";")[1];  
  var f1 = pieces[counter+i1].split(";")[1];
  var f2 = pieces[counter+i2].split(";")[1];
  var f3 = pieces[counter+i3].split(";")[1];

  var ans_list = generate_answers_list(f0,f1,f2,f3);
  var ans_ind = ans_list.indexOf(ans);
  right_answer = ans_ind;
  // console.log("answer is in " + ans_ind);
  for (let i =0;i<4; i++)
  {
    // console.log(i)
    if (document.getElementById("ans"+i)!= null)
    {
      let ele = document.getElementById("ans"+i)
      ele.style.transition="color 0s";
      // flushCss(ele);
      // ele.style.color="rgb(49, 48, 75)";
      // ele.style.borderColor = "rgb(183, 183, 183)";
      // ele.style.transition="color 2s"; 
      // flushCss(ele);
      document.querySelector("#ans" + i).classList.remove('disabled-li');
      document.querySelector("#ans" + i).classList.remove('mc-wrong-answer');
      document.querySelector("#ans" + i).classList.remove('mc-right-answer');


    }
  }
  real_ans_list=ans_list;
}


  return (
    <> 
      <> 
      <div className='question-card'>
      <h1>What is {que}?</h1>

      <ul>
        <li id="ans0" className={""}
        onClick={() => check_answer(0, ans_ind, handleAnswer)}>{real_ans_list[0]}</li>
        <li id="ans1" className={""}
        onClick={() => check_answer(1, ans_ind, handleAnswer)}>{real_ans_list[1]}</li>
        <li id="ans2" className={""}
        onClick={() => check_answer(2, ans_ind, handleAnswer)}>{real_ans_list[2]}</li>
        <li id="ans3" className={""}
        onClick={() => check_answer(3, ans_ind, handleAnswer)}>{real_ans_list[3]}</li>
      </ul>  
      </div>
      </>
    
    </>
  )
}