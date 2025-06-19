const Notification = ({ styles,message }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={styles} className='error'>
      {message}
    </div>
  )
}

export default Notification;