const express = require('express')
const router = express.Router( )

const courses = [
  { id: 1, name: 'course 1'},
  { id: 2, name: 'course 2'},
  { id: 3, name: 'course 3'}
  ]
  

router.get('/', (req,res) => {
  res.send(courses);
})

router.post('/', (req, res) => {
  

  const result = validateCourse(req.body)
  const { error } = validateCourse(req.body)

  if(error) {
    res.status(400).send(result.error.details[0].message)
    return
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

router.put('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with given ID not found')
  res.send(course)

  const schema = {
    name: Joi.string().min(3).required()
  }

  const result = validateCourse(req.body)
  const { error } = validateCourse(req.body)

  if(error) {
    res.status(400).send(result.error.details[0].message)
    return
  }

  course.name = req.body.name
  res.send(course)
   
});

function validateCourse(course) {
  
  const schema = {
    name: Joi.string().min(3).required()
  }

return Joi.validate(course, schema)
}

router.get('/:id', (req, res) => {
  let course = courses.find(c =>  c.id === parseInt(req.params.id));
     if (!course) res.status(404).send('The course with given ID not found')
});
     
router.delete('/:id', (req, res) => {
  let course = courses.find(c =>  c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with given ID not found')

 const index = courses.indexOf(course)
 courses.splice(index, 1)

 res.send(course)
})

module.exports = router