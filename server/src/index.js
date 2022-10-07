const express = require('express')
const cors = require("cors");
const prisma = require('@prisma/client')
var bodyParser = require('body-parser')

const app = express()
app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const client = new prisma.PrismaClient();

app.get('/api', async function (req, res) {
  console.log(req.query);

  // const username = req.params.username;
  const username = req.query.username;
  // console.log(req);
  try
   {
    await client.user.create({data: {name: "nig", sets:{create: 
        {
          name:"portu",
          terms:"uma televisão;a TV;;;uma pasta;a briefcase;;;uma mesa;a table;;;uma cadeira;a chair;;;uma porta;a door;;;uma casa;a house;;;uma árvore;a tree;;;uma chave;a key;;;uma janela;a window;;;uma flor;a flower;;;uma caneta;a pen;;;uma carta;a card;;;uma garrafa;a bottle;;;uma chàvena;a tee cup;;;um avião;a plane;;;um copo;a glass",
          progression:""
        }}}});
    }
    catch{
      console.log("failed to create account");
    }
    
  try
  {
    await client.user.create({data: {name: "nigo", sets:{create: 
        {
          name:"portu",
          terms:"um candeeiro ;a lamp;;;um telefone ;a telephone;;;um rádio ;a radio;;;um livro ;a book;;;um cão ;a dog;;;um gato ;a cat;;;um computador ;a computer;;;um mapa ;a map;;;um cinzeiro ;an ashtray;;;um cigarro ;a cigarette;;;um barco ;a boat;;;um relógio ;a clock;;;um carro ;a car;;;um lápis ;a pencil;;;os livros ;books;;;as mesas ;tables",
          progression:""}}}});
    }
    catch{
      console.log("failed to create account");
    }
  const user = await client.user.findUnique({
    where : {
    name: username}, 
  select : {sets:true,}
    }

    );
    console.log(user.sets[0].progression);

  res.json({terms:user.sets[0].terms,progression:user.sets[0].progression});
  // res.send("niga");

})

app.post('/api', jsonParser, cors(), async function (req, res) {

  console.log(req.body);
  let fm = await client.user.update({where:{
  name:req.body.username},
  data:{
    sets: {
      updateMany: [
        {
          data:{
            progression:req.body.prog.toString()},
          where:{ 
            name: req.body.set_name
            }
          }]},
    }  
  });
  // console.log(fm);

});


app.listen(5000);
