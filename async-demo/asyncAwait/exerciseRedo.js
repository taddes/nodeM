// function getCustomer(id, callback) {
//   setTimeout(() => {
//     callback({
//       id: 1,
//       name: 'taddes',
//       isGold: true,
//       email: 'taddes@taddes.com'
//     })
//   }, 4000)
// }

// function getTopMovies(callback) {
//   setTimeout(() => {
//     callback(['Mov 1', 'Mov 2'])
//   }, 4000)
// }

// function sendEmail(email, movies, callback) {
//   setTimeout(() => {
//     callback()
//   }, 4000)
// }

// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer)
//   if(customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top Movies', movies)
//       sendEmail(customer.email, movies, () => {
//         console.log('Email Sent')
//       })
//     })
//   }
// })

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
      id: 1,
      name: 'taddes',
      isGold: true,
      email: 'taddes@taddes.com'
      })
    }, 4000)
  })
}


function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['Mov 1', 'Mov2'])
    }, 4000)
  })
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 4000)
  })
}

async function notifyCustomer() {
const customer = await getCustomer(1) 
  console.log('Customer', customer)
  if(customer.isGold) {
    const movies = await getTopMovies()
    console.log('Top movies', movies)
    await sendEmail(customer.email, movies)
    console.log('Email Sent')
  }
}
notifyCustomer()