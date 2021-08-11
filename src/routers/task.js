const express = require('express')
const router = new express.Router()
const Task = require("../models/task")
const auth = require("../middleware/authentication")
const User = require('../models/user')


router.post('/tasks', auth, async (req,res) =>{
    // const task = new Task(req.body)
    // task.owner = req.user._id

    const task = new Task({
        ...req.body,
        owner : req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e){
        res.status(400).send(e)
    }
    
})




router.get('/tasks', auth ,async (req,res) =>{

    const match = {}

    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    
    try {
        // const tasks = await Task.findOne({owner._id:req.user.id})
        // user = await User.findById(req.user.id)
        await req.user.populate({
            path : 'tasks',
            match, 
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)

            }

        }).execPopulate()
        user_tasks = req.user.tasks
        res.send(user_tasks)
    } catch (e){
        res.status(500).send(e)
    }

    

})

router.get('/tasks/:id', auth ,async (req,res) =>{
    const _id = req.params.id
    
    

    try {
        // const task = await Task.findById(_id)
        // if(!task){
        //     return res.status(404).send() 
        // }

        // user = await User.findById(req.user.id)
        // await user.populate('tasks').execPopulate()
        // console.log(user.tasks)
        // task = user.tasks.filter((task) =>{
        //     return task._id == _id
        // })

        task = await Task.findOne({ _id:_id , owner: req.user._id})
        res.send(task)      

    } catch (e) {
        res.status(404).send(e)
    }
})




router.patch('/tasks/:id', auth ,async (req,res) => {
    const allowedUpdates = ['description','completed']
    const _id = req.params.id
    const body = req.body
    const updates = Object.keys(body)

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({"error":"Invalid Update"})
    }

    try {
        // const task = await Task.findById(_id)

        // user = await User.findById(req.user.id)
        // await user.populate('tasks').execPopulate()
        // task = user.tasks.filter((task) =>{
        //     return task._id == _id
        // })
        // console.log(task)
        const task = await Task.findOne({ _id:_id , owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        //const task = await Task.findByIdAndUpdate(_id,body,{ new: true , runValidators: true })
        
        res.status(201).send(task)
    } catch (e) {
        res.send(e)
    }
})



router.delete('/tasks/:id', auth ,async (req,res) =>{
    const _id = req.params.id

    try{
        // const task = await Task.findByIdAndDelete(_id)
        // const task = await Task.findOne({ _id:_id , owner: req.user._id})
        const task = await Task.findOneAndDelete({ _id:_id , owner: req.user._id})

        if(!task){
            return res.status(404).send()
        }
        
        res.send(task)
    } catch(e){
        res.send(e)
    }
})



module.exports = router