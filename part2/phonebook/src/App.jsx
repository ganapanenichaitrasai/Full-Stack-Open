import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Perosns'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [search,setSearch] = useState('')
  const [purify,setFilter] = useState(false)

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
        window.alert(`${newName} is already added to phonebook`)
        flag = false
      }
    })
    if(flag){
    const objectName = {
      name : newName,
      number : newNumber
    }
    setPersons(persons.concat(objectName))
    setNewName('')
    setNewNumber('')
  }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setFilter(true)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text = "filter shown with" value = {search} onChange = {handleSearch} />
      <h3>add a new</h3>
      <PersonForm onSubmit = {handleSubmit} value1 = {newName} value2 = {newNumber} onChangeName = {handleNameChange} onChangeNumber = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} />
    </div>
  )
}

export default App