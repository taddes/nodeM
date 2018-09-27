// Require Express
const express = require('express');

// Require Joi
const Joi = require('joi')

// Initiate express, middleware for parsing JSON
const app = express();
app.use(express.json());

// PORT definition 
const PORT = process.env.PORT || 3000;

// Genres - emulate server data
const genres = [
  { id: 1, name: 'Sci-Fi'},
  { id: 2, name: 'Rom-Com'},
  { id: 3, name: 'Action'},
  { id: 4, name: 'Drama'},
]

// Root Get route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the movie genre page!</h1>')
})

// Get Route
app.get('/api/genres', (req, res) =>{
  res.send(genres)
})

// Get Route for individual items
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(item => item.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('No such genre with ID was found')
  res.send(genre)
})

// POST route
app.post('/api/genres', (req, res) => {
  const { error } = validation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }
  genres.push(genre)
  res.send(genre)
})

// PUT Route
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(item => item.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('No such item found') 

  const { error } = validation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  genre.name = req.body.name
  res.send(genre)
})

// Delete Route
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(item => item.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('Could not delete. No such item found')

  const index = genres.indexOf(genre)
  genres.splice(index, 1)

  res.send(genre)
})


function validation(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(genre, schema)
}

// Listener
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
});