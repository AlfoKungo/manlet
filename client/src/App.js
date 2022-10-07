import {useEffect, useState, Component} from 'react';
// const axios = require('axios');
import axios from 'axios';
import FlashCard from './Questions/FlashCardQuestion'
import MulChoQuestion from './Questions/MulChoQuestion'
import WriteQuestion from './Questions/WriteQuestion'


import './App.css';




// const terms = "uma televisão;a TV;;;uma pasta;a briefcase;;;uma mesa;a table;;;uma cadeira;a chair;;;uma porta;a door;;;uma casa;a house;;;uma árvore;a tree;;;uma chave;a key;;;uma janela;a window;;;uma flor;a flower;;;uma caneta;a pen;;;uma carta;a card;;;uma garrafa;a bottle;;;uma chàvena;a tee cup;;;um avião;a plane;;;um copo;a glass;;;um candeeiro;a lamp;;;um telefone;a telephone;;;um rádio;a radio;;;um livro;a book;;;um cão;a dog;;;um gato;a cat;;;um computador;a computer;;;um mapa;a map;;;um cinzeiro;an ashtray;;;um cigarro;a cigarette;;;um barco;a boat;;;um relógio;a clock;;;um carro;a car;;;um lápis;a pencil;;;os livros;books;;;as mesas;tables;;;um rapaz;a boy;;;rapazes;boys;;;o mês;the month;;;meses;months;;;um homen;a man;;;os homens;men;;;bom;good (Sg.);;;bons;good (Pl.);;;o jornal;the newspaper;;;os jornais;newspaper (Pl.);;;o papel;the paper;;;os papéis;sheets of paper (pl.);;;azul;blue;;;azuis;blue (pl.);;;a mão;the hand;;;as mâos;hands;;;o limão;the lemon;;;os limões;lemons;;;o cão;the dog;;;os cães;dog;;;dois lápis;two pencils;;;grande;big;;;pequeno;small;;;grosso;thick;;;fino;thin;;;forte;strong;;;fraco;weak;;;velho;old (objects & people);;;novo;new (objects);;;jovem;young (people & animal);;;curto;short;;;comprido;long;;;gordo;fat;;;magro;skinny;;;alto;tall;;;baixo;short;;;bonito;beautiful;;;feio;ugly;;;rico;rich;;;pobre;poor;;;caro;expensive;;;barato;cheap;;;em cima de;on top of;;;debaixo de;under;;;por cima de;above;;;dentro de;inside;;;fora de;outside of;;;à frente de;in front of;;;atrás de;behind;;;em frente de/a;in front of (facing each other) / opposite;;;ao lado de;next to;;;entre ... e ...;in between;;;mal;schlecht, schlimm;;;bem;gut;;;meu bem;mein Schatz;;;uma mala;a suitcase;;;branco/a;white;;;preto/a;black;;;cinzento/a;grey;;;laranja;orange;;;vermelho/a;red;;;amarelo/a;yellow;;;cor-de-rosa;rose;;;verde;green;;;castanho/a;brown;;;roxo/a;purple;;;De que cor é / sao ...;What is / are the colours ...;;;Como está?;Wie geht es Ihnen?;;;Éstas bom?;Are you good?;;;Tudo bem?;All good?;;;o restaurante;the restaurant;;;a piscina;the swimming pool;;;o banco;the bank;;;a escola;the school;;;o cinema;the movie theatre;;;o supermercado;the supermarket;;;só;nur;;;senão;otherwise;;;um namorodo;a boyfriend;;;uma namorada;a girlfriend;;;namorar;to date;;;acho que não / sim;I think so / I do not think so;;;achar;think / find;;;a semana;the week;;;a segunda-feira;Monday;;;a terça-feira;Tuesday;;;a quarta-feira;Wednesday;;;a quinta-feira;Thursday;;;a sexta-feira;Friday;;;o sábado;Saturday;;;o domingo;Sunday;;;os Estados Unidos;the US;;;estar come fome;to be hungry;;;estar com sede;to be thirsty;;;estar com frio;to be cold;;;estar com calor;to be hot;;;estar contente;to be happy;;;estar triste;to be unhappy;;;estar cansado/a;to be tired;;;estar doente;to be sick;;;aberto;open;;;fechado;closed;;;cheio;full;;;vazion;empty;;;ligado;on;;;desligado;off;;;aceso;on (lights);;;apagado;off (lights);;;sujo;dirty;;;limpo;clean;;;seco;dry;;;molhado;wet;;;isto;this (indefinite);;;isso;that (indefinite);;;aquilo;that over there (indefinite);;;aqui;here;;;ai;there;;;ali;over there;;;este/esta estes/estas;this (definite);;;esse/essa esses/essas;that (definite);;;aquele/aquela aqueles/aquelas;that over there (definite);;;"
// const terms = "uma televisão;a TV;;;uma pasta;a briefcase;;;uma mesa;a table;;;uma cadeira;a chair;;;uma porta;a door;;;uma casa;a house;;;uma árvore;a tree;;;uma chave;a key;;;uma janela;a window;;;uma flor;a flower;;;uma caneta;a pen;;;uma carta;a card;;;uma garrafa;a bottle;;;uma chàvena;a tee cup;;;um avião;a plane;;;um copo;a glass"
// let  pieces = terms.split(";;;");
let  pieces;

let dataIsReturned = false;

let mc_words =[];
let write_words =[];
let done_words =[];
let words_status = [];

let words_this_round = [];
let new_words_in_round =0;

// let is_answer_loaded = false;
let loaded_answer_value = false;
let is_allow_next_question =false;
let is_nextQue = false;

let counter_val = 0;

var done = false;

const WM_UNKNOWN = 0;
const WM_MC = 1;
const WM_WRITE = 2;
const WM_WRITE2 = 3;

const WM_DONE = 4;

function create_words_stat()
{
  console.log(pieces);
  words_status = [];
  
  words_status = new Array(pieces.length).fill(0);
  words_status[0] = 1;
  console.log(":" + words_status);
}

function set_by_words_status()
{
  for (let i = 0; i< words_status.length; i++){
    let ws = words_status[i];
    if (ws == WM_MC)
      mc_words.push(i);
    if (ws == WM_WRITE)
      write_words.push(i);
    if (ws == WM_DONE)
      done_words.push(i);
  }
}

function send_ws_to_server(username, set_name)
{
  axios.post("http://localhost:5000/api", {
    prog: words_status,
    username: username,
    set_name: set_name,
  })
  .then(function (response) {
    console.log(response);
  });
}

function get_new_word()
{
  if (!words_status.includes(0))
    return get_familiar_word();
  // return words_status.findIndex((ele) => ele == 0);
  return words_status.indexOf(0);

}
function get_familiar_word()
{
  // return 0;
  const comb = mc_words.concat(write_words);
  const difference = comb.filter( x => !words_this_round.includes(x) ); 
  if (difference.length > 0)
  {
    let new_word = difference[Math.floor(Math.random() * (difference.length))];

    return new_word;
  }
  else 
  {
    if (pieces.length == comb.length + done_words.length)
      return comb[Math.floor(Math.random() * (difference.length))]
    let new_word = get_new_word();
    console.log("newwww " + new_word);
    return new_word;
  }
}

function NextQuestion(is_answerd_right, counter, setCounter, setQType, setStageCounter)
{
  let word_stat = words_status[counter];
  words_this_round.push(counter);

  if (is_answerd_right)
  {
    if (word_stat < 3)
      words_status[counter] = word_stat+1;
    switch (word_stat)
    {
      case 0:
        mc_words.push(counter);
        break;
      case 1:
        mc_words.splice(mc_words.indexOf(counter), 1)
        write_words.push(counter);
        break;
      case 2:
        write_words.splice(write_words.indexOf(counter), 1)
        done_words.push(counter);
        break;
        default:
    }
  }
  else
  {
    if (word_stat > 1)
      words_status[counter] = word_stat-1;
    switch (word_stat)
    {
      case 0:
        break;
      case 1:
        break;
      case 2:
        write_words.splice(write_words.indexOf(counter),1);
        mc_words.push(counter);
        break;
        default:
    }
  }
  if (words_this_round.length < 8)
  {
    let mc_size = mc_words.length;
    if (mc_size < 20)
    {
      if (new_words_in_round < 2 && mc_size < 10)
      {
        let new_counter = get_new_word();
        words_status[new_counter] = WM_MC;
        mc_words.push(new_counter);
        console.log("nigaa 1 ");

        updateCounter(setCounter, new_counter, setQType, setStageCounter)

        new_words_in_round++;
      }
      else
      {
        let new_word = get_familiar_word();
        if (!mc_words.includes(new_word) && !write_words.includes(new_word))
        {
          mc_words.push(new_word);
          words_status[new_word] = WM_MC;
        }
        console.log("nigaa 2 ");

        updateCounter(setCounter, new_word, setQType, setStageCounter)
        new_words_in_round++;
      }

    }
    else
    {
      let new_counter = mc_words[Math.floor(Math.random() * (mc_words.length))];
      updateCounter(setCounter, new_counter, setQType, setStageCounter)
    }
  }
  else
  {
    new_words_in_round = 0;
    words_this_round = [];
    let new_word = get_familiar_word();
    if (!mc_words.includes(new_word) && !write_words.includes(new_word))
    {
      mc_words.push(new_word);
      words_status[new_word] = WM_MC;
    }
    console.log("nigaa 3 ");

    send_ws_to_server("nig", "portu");
    updateCounter(setCounter, new_word, setQType, setStageCounter)


    // next round
  }
}

function allow_next_question(setNextQue)
{
  is_allow_next_question = true;
  setNextQue(true);
}

function load_next_question(is_answered_right,setNextQue)
{
  loaded_answer_value = is_answered_right;
  setTimeout(() => { 
    allow_next_question(setNextQue);
    }, 200);
}

function trigger_next_question(setCounter, setNextQue, setQType, setStageCounter)
{
  if (is_allow_next_question)
  {
    NextQuestion(loaded_answer_value, counter_val, setCounter, setQType, setStageCounter);
    is_allow_next_question = false;
    setNextQue(false);
  }
  
}

function updateCounter(setCounter, new_counter, setQType, setStageCounter)
{
  // console.log(words_status);
  console.log("new word is " + new_counter);
  setStageCounter((prev) => prev +1);
  setCounter(new_counter);
  updateQType(new_counter, setQType);
}

function updateQType(counter, setQType)
{
  if (words_status[counter] == 1 )
      { setQType(0); }
      else
      { setQType(1); } 
}

const loadAllState = async(setCounter,setQType, setStageCounter) => {
  let username = "nig";
  await fetch("http://localhost:5000/api?username="+username).then(
      response => response.json()
    ).then(
      data => {
        pieces = data.terms.split(";;;");
        if (data.progression != "")
          words_status = data.progression.split(',').map(function(item) {
            return parseInt(item, 10);
      });
      }
    );
    console.log(words_status);
    if (words_status == ""){
      console.log("hollaaaa");
    create_words_stat();
    send_ws_to_server(username, "portu");
    }
    dataIsReturned = true;
    
    set_by_words_status();
    updateCounter(setCounter, get_familiar_word(), setQType, setStageCounter); 

    }

const App = () => {

  const [counter, setCounter] = useState(0);
  const [stageCounter, setStageCounter] = useState(0);
  const [qType, setQType] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [nextQue, setNextQue] = useState(false); 

// componentDidMount() {
//   console.log();
// }
//   componentDidMount() {
//     fetch("http://localhost:5000/api").then(
//       response => response.json()
//     ).then(
//       data => {
//         // console.log(data);
//         pieces = data.terms.split(";;;");
//         create_words_stat();

//         console.log(pieces);
//       }
//     )
// };

  useEffect(() =>{
    loadAllState(setCounter,setQType, setStageCounter);
  }, []);

    
  const handleAnswer = (val) => {
    // setAnswer(val);
    load_next_question(val, setNextQue);
  }
  // window.addEventListener('keydown', function(e) {
  //   if(e.key == ' ') {
  //     e.preventDefault();
  //   }
  // });

  document.addEventListener('keydown', 
  (event) => { 
    if(event.key == ' ' || event.key == 'Enter') 
      trigger_next_question(setCounter, setNextQue, setQType, setStageCounter);
  });

  

  useEffect(() => {
    if (counter >= 0)
    {
      console.log("new word is " + counter);
      counter_val = counter;
      
      updateQType(counter, setQType);
    }   
},[counter]);

  return (
    <div className="App">
    { dataIsReturned ?
    (
      <>
    <div className="question-div"
      onClick={(event) =>  
          trigger_next_question(setCounter, setNextQue, setQType, setStageCounter)}>
            
    {qType == 0 ?(
      <MulChoQuestion counter={counter} pieces = {pieces}
       handleAnswer={handleAnswer} stageCounter={stageCounter}/>
      // <WriteQuestion counter={counter} pieces = {pieces} handleAnswer={handleAnswer}/>


    )
      :(
        <WriteQuestion counter={counter} pieces = {pieces}
         handleAnswer={handleAnswer} stageCounter={stageCounter}/>
        // <MulChoQuestion counter={counter} pieces = {pieces} handleAnswer={handleAnswer}/>

      )}
      <h3>{nextQue ? (
      // <h3>{is_nextQue ? (

      <>
      Click anything to move to next question
      </>
    ) : (
      <>
         
      </>
    )}
    </h3>
    </div>
    

       <h1>{mc_words.toString()}</h1>
       
    <h1>{write_words.toString()}</h1>
    <h1>{done_words.toString()}</h1>
    <h1>{words_status.toString()}</h1>
    </>
    ) : 
    <h1>Loading</h1>}
    </div>
  );
}

export default App;
 


    // {/* <button onClick={() => setCounter(Math.floor(Math.random() * (pieces.length)))}>Randomize</button>
    // <input id="write-box" autoComplete="off" placeholder='Insert text'/> */}