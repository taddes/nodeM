const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to Mongo: ', err))

  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
  });

  const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
  const course = new Course({
    name: 'Vue Course',
    author: 'Taddes',
    tags: ['vue', 'javascript'],
    isPublished: true
  });
  const result = await course.save();
  console.log(result)
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumer=2&pageSize=10

  const courses = await Course
  // .find( { author: /^Mosh/} )
  .find( { author: 'Mosh', isPublished: true} )
  .limit(pageSize)
  .sort({ name: 1 })
  console.log(courses)
}

getCourses()

async function updateCourse(id) {
  const result = await Course.update({ _id: id}, {
    $set: {
      author: 'Taddes',
      isPublished: false
    }
  })

  console.log(result)
}
updateCourse('5b5bd0244c8a3722246e4eb5')

async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id })
  const course = await Course.findOneAndRemove(id)
  console.log(course)
}
