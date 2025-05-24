const Persons = ({personsToShow}) => {
  return(
    <div>
        {personsToShow.map((person,i) => {
        return <p key={i}>{person.name} {person.number}</p>
      })}
    </div>
  )
}

export default Persons;