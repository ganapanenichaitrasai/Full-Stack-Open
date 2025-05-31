import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Perosns'
import { useEffect } from 'react'
import Notification from './components/Notification'
import './index.css'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [search,setSearch] = useState('')
  const [purify,setFilter] = useState(false)
  const [notification,setNotification] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const personsToShow = purify? persons.filter((person)=> person.name.startsWith(search) === true) : persons

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    // console.log(e.target.value)
    setNewNumber(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    var flag = true
    persons.forEach(person => {
      if (person.name === newName) {
        // console.log("match")
        if(window.confirm(`${newName} is already added to phonebook,replace the old number with new one?`)){
          const changedPerson = {...person,number:newNumber}
          axios
            .put(`http://localhost:3001/persons/${person.id}`,changedPerson)
            .then(response => {
              setPersons(persons.map(person => person.name === newName? changedPerson : person))
            })
            setNewName('')
            setNewNumber('')
        }
        flag = false
      }
    })
    if(flag){
    const objectName = {
      name : newName,
      number : newNumber,
      id: String(persons.length + 1)
    }
    axios
      .post('http://localhost:3001/persons',objectName)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotification(`Added ${newName}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setFilter(true)
  }

  const handleDelete = (name,id) => {
  if(window.confirm(`Delete ${name}`)){
    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(response => {
        console.log(response.data)
        const updatedPersons = persons.filter(person => person.name != response.data.name)
        setPersons(updatedPersons)
      })
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification} />
      <Filter text = "filter shown with" value = {search} onChange = {handleSearch} />
      <h3>add a new</h3>
      <PersonForm onSubmit = {handleSubmit} value1 = {newName} value2 = {newNumber} onChangeName = {handleNameChange} onChangeNumber = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} handleDelete = {handleDelete} />
    </div>
  )
}

export default App