const express = require('express')
const router = express.Router();
const Joi = require('joi')

const movies = [
    {id: 1, movieGenre: 'horror'},
    {id: 2, movieGenre: 'comedy'},
    {id: 3, movieGenre: 'love'}
]

router.get('/', (req, res) => {
    res.send(movies)
})

router.get('/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id))

    if(!movie) {
        res.status(404).send('The movie with the given ID was not found')
        return
    }
    res.send(movie)
})

router.post('/', (req, res) => {
    const {error} = validateCourse(req.body)
    if(error) {
        res.status(404).send(error.details[0].message)
        return 
    }
   
    const movie = {
        id: movies.length + 1,
        movieGenre: req.body.movieGenre,
    }
    movies.push(movie)
    res.send(movie)
})
router.put('/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id))

    if(!movie) {
        res.status(404).send('The movie with the given ID was not found')
        return
    }
    const {error} = validateCourse(req.body)
    if(error) {
        res.status(404).send(error.details[0].message)
        return 
    }
    movie.movieGenre = req.body.movieGenre
    res.send(movie)
})

function validateCourse(movie) {
    const schema = {
        movieGenre: Joi.string().min(3).required()
    }
    return Joi.validate(movie, schema)
}

router.delete('/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id))

    if(!movie) {
        res.status(404).send('The movie with the given ID was not found')
        return
    }
    const index = movies.indexOf(movie)
    movies.splice(index, 1) 
}
)

module.exports = router