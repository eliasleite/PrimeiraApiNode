const Router = require('express')
const Person = require('../Models/Person')

const router = require('express').Router()

// router.get('/',  (req, res) => {
//     res.json({
//         message: 'Oi primeira API em Nodejs!'
//     })
// })

router.post('/', async (req, res) => {
    
    const {name, salary, dateOfBirth, approved} = req.body

    if(!name) {
        res.status(422).json({message: 'O Nome é obrigatório'})
        return
    }

    const person =  {
        name, 
        salary,
        dateOfBirth,
        approved
    }

    try {
        await Person.create(person)
        res.status(201).json({message: 'Pessoa inserida com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req , res) => {
    try {
        const people = await Person.find()        

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const person = await Person.findOne({_id: id});
        
        if(!person){
            res.status(422).json({message: 'Usuario não encontrado'})
            return
        }
        
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req, res)  => {
    const id = req.params.id

    const {name, salary, dateOfBirth, approved} = req.body

    const person =  {
        name, 
        salary,
        dateOfBirth,
        approved
    }

    try {
        const personToUpdate = await Person.updateOne({_id: id}, person);

        if(personToUpdate === 0){
            res.status(422).json({message: 'Usuario não encontrado'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id});
        
        if(!person){
            res.status(422).json({message: 'Usuario não encontrado'})
            return
        }

        await Person.deleteOne(person)
        
        res.status(200).json({message: 'Usuario deletado!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router