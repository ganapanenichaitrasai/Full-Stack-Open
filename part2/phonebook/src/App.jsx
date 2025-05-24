import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Perosns'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [search,setSearch] = useState('')
  const [purify,setFilter] = useState(false)

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