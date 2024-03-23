const getTimeString = (dateTimeString) => {
  const dateTime = new Date(dateTimeString)
  return dateTime.toLocaleTimeString()
}

export default getTimeString
