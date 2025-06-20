const {test, describe} = require('node:test')
const assert  = require('node:assert')
const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const config = require('../utils/config')
const Blog = require('../models/blog')

describe('blogs',() =>{
   test('blogs return 1',() => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result,1)
})
   test('blogs total likes', () =>{
    mongoose.connect(config.MONGODB_URI).then(async () => {
        const blogs = await Blog.find({})
        const result = listHelper.total_likes(blogs)
        assert.strictEqual(result,15)
        mongoose.connection.close()
    })
    .catch(error => console.log(error.message))
   })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.total_likes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})
 