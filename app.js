const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('<h1>What up dog?!</h1>')
    res.end()
  }

  if (req.url === '/api') {
    res.write(JSON.stringify([1, 2, 3]))
    res.end()
  }
})
server.listen(3000)



console.log('Listening on port 3000')