const PersonForm = ({onSubmit,value1,value2,onChangeName,onChangeNumber}) => {
  return(
    <div>
        <form onSubmit={onSubmit}>
        <div>
          name: <input value={value1} onChange={onChangeName} />
        </div>
        <div>
          number: <input value = {value2} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm;