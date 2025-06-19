import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import Notification from './components/Notification'
import './index.css'
import axios from 'axios'

const url = "http://localhost:3001/api/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [search,setSearch] = useState('')
  const [purify,setFilter] = useState(false)
  const [notification,setNotification] = useState(null)
  const [styles,setStyles] = useState({})

  useEffect(() => {
    axios
      .get(`${url}`)
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
        console.log(person.id)
        if(window.confirm(`${newName} is already added to phonebook,replace the old number with new one?`)){
          const changedPerson = {...person,number:newNumber}
          axios
            .put(`${url}/${person.id}`,changedPerson)
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
      number : newNumber
    }
    axios
      .post(`${url}`,objectName)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotification(`Added ${newName}`)
        setStyles({color: 'green'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setNotification(`${error.response.data.error}`)
        setStyles({color :'red'})
        setTimeout(() => {
          setNotification(null)
          setStyles({})
        }, 5000)
        console.log(error.response.data.error)
      })
  }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setFilter(true)
  }

  const handleDelete = (name,id) => {
    console.log(name,id)
  if(window.confirm(`Delete ${name}`)){
    axios
      .delete(`${url}/${id}`)
      .then(response => {
         setPersons(persons.filter(person => person.id !== id))
         setNotification(`Deleted ${name}`)
         setStyles({color : 'green'})
         setTimeout(() => {
          setNotification(null)
          setStyles({})
        }, 5000)
      })
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification styles = {styles} message = {notification} />
      <Filter text = "filter shown with" value = {search} onChange = {handleSearch} />
      <h3>add a new</h3>
      <PersonForm onSubmit = {handleSubmit} value1 = {newName} value2 = {newNumber} onChangeName = {handleNameChange} onChangeNumber = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} handleDelete = {handleDelete} />
    </div>
  )
}

export default App