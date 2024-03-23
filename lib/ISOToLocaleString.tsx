const ISOToLocaleString = (ISOTimestamp) =>
  ISOTimestamp.toLocaleTimeString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })

export default ISOToLocaleString
