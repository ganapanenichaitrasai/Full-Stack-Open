const express = require("express")
require("dotenv").config()
const cors = require("cors")
const app = express()
const morgan = require("morgan")
const Data = require("./models/persons.js")

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :post')
)
morgan.token('post', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ' '
})

app.get('/api/persons',(req,res) => {
  Data.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info',(req,res) => {
  res.send(
    `<p>Phonebook has info for ${Data.length + 1} people</p>
      <p>${new Date()}</p>`)
  
})

app.get('/api/persons/:id',(req,res) => {
  Data.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).end()
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Data.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons',(req,res) => {
  const { name, number } = req.body
  var flag;
  if(!name || !number){
    res.status(400).json({
      error: 'name or number missing',
    })
  }
  else{
    Data.find({name}).then(person => {
      flag = person.name
    })
    if (!flag){
      
      const person = new Data({
      "name" : name,
      "number" : number
    })
    person.save().then(result => {
      res.json(result)
    })
    }

    else {
      res.status(400).json({error : "name must be unique"})
   }
  }
  
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  Data.findById(req.params.id)
    .then(note => {
      if (!note) {
        return res.status(404).end()
      }
      note.name = name;
      note.number = number;
      return note.save().then(updatedNote => {
        res.json(updatedNote)
      })
    })
    .catch(error => next(error))
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})