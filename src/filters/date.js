// use the filter as {{ value | date }}
export default (value) => {
  if (value) {
    const date = new Date(value)
    return date.toLocaleDateString(['ru-RU'], {month: 'long', day: '2-digit', year: 'numeric'})
  } else {
    return ''
  }
}
