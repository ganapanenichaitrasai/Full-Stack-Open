const Persons = ({personsToShow,handleDelete}) => {
  return(
    <div>
        {personsToShow.map((person,i) => {
        return(
          <div key={i}>
            <p>
            {person.name} {person.number}             
            <button onClick={() => handleDelete(person.name,person.id)}>Delete</button>
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Persons;