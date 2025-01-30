const Greeting = () => {
  const hour = new Date().getHours()

  let greeting = ''

  if (hour < 12) {
    greeting = 'Good morning'
  } else if (hour < 18) {
    greeting = 'Good afternoon'
  } else {
    greeting = 'Good evening'
  }

  return <h1>{greeting}!</h1>
}

export default Greeting
