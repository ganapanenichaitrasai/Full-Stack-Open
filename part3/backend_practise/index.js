const express = require('express')
require("dotenv").config();
const cors = require("cors")
const app = express()
const Note = require("./models/notes.js")


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

// const generateId = () => {
//   const maxId =
//     notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0
//   return String(maxId + 1)
// }

app.post('/api/notes', (request, response) => {
  const {content,important} = request.body

  if (!content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: content,
    important: important || false
  })

  note.save().then(result => {
    response.json(result)
  })
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})