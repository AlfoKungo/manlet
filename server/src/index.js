const express = require('express')
const app = express()
const prisma = require('@prisma/client')

const client = new prisma.PrismaClient();

app.get('/', async function (req, res) {
    await client.user.create({data: {sets:{create: 
        {sets:{"hola":5}}}}});

  res.send({"hoartttlla":7});
  
})


app.listen(3000);