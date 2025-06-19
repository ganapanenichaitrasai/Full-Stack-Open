const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/',(req,res,next) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})

blogRouter.post('/',(req,res,next) => {
    const {title,author,url,likes} = req.body
    const blog = new Blog({
        title : title,
        author : author,
        url : url,
        likes : likes
    })

    blog.save().then(result => {
        res.json(result)
    })
    .catch(error => next(error))
})

module.exports = blogRouter