const express = require("express")
const app = express()
var Data = require("./data.js")



app.use(express.json())

app.get('/api/persons',(req,res) => {
  res.json(Data)
})

app.get('/info',(req,res) => {
  res.send(
    `<p>Phonebook has info for ${Data.length} people</p>
      <p>${new Date()}</p>`)
  
})

app.get('/api/persons/:id',(req,res) => {
  const id = req.params.id
  person = Data.find(person => person.id == id) 
  if(person){
    res.json(person)
  }
  else{
    res.status(404).end()
  }
})

app.delete('/api/persons/:id',(req,res) => {
  id = req.params.id
  persons = Data.filter(person => person.id!=id)
  Data = persons
  res.json(Data)
})

app.post('/api/persons',(req,res) => {
  const { name, number } = req.body
  if(!name || !number){
    res.status(400).json({
      error: 'name or number missing',
    })
  }
  else{
    const flag  = Data.find(person => person.name===name)
    if (!flag){
      
      const person = {
      "id" : String(Math.random(1000)),
      "name" : name,
      "number" : number
    }
    Data = Data.concat(person)
    res.json(Data)
    }

    else {
      res.status(400).json({error : "name must be unique"})
   }
  }
  
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})