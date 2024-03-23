const getDateString = (dateTimeString) => {
  const dateTime = new Date(dateTimeString)
  return dateTime.toLocaleDateString()
}

export default getDateString
