const express = require('express')
const { findById } = require('../models/user')
const router = new express.Router()
const User = require("../models/user")
const auth = require('../middleware/authentication')


router.get('/users/me', auth ,async (req,res) =>{
    
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e){
    //     res.status(500).send(e)
    // }
    res.send(req.user)

})

// router.get('/users/:id', async (req,res) =>{
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send() 
//         }
//         res.send(user)     
//     } catch (e) {
//         res.status(404).send(e)
//     }

// })

router.post('/users', async (req,res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        // const token = await user.generateAuthToken()
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
    

})

router.post('/users/login', async (req,res) => {
    email = req.body.email
    password = req.body.password
    try{
        const user = await User.findByCredentials(email,password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req,res) => {
    console.log("Inside user logout  router")
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        console.log(req.user.tokens)

        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send(e)
    }

})

router.post('/users/logoutAll', auth, async (req,res) =>{
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send()
    } catch(e){
        res.status(500).send(e)
    }
})


router.patch('/users/me', auth ,async (req,res) => {
    const allowedUpdates = ['name','email','age','password']
    const _id = req.params.id
    const body = req.body
    const updates = Object.keys(body)

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({"error":"Invalid Update"})
    }

    try {
        // const user = await User.findById(_id)
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()


        //const user = await User.findByIdAndUpdate(_id,body,{ new: true , runValidators: true })
        // await user.save()
        // if(!user){
        //     return res.status(404).send()
        // }
        res.status(201).send(user)
    } catch (e) {
        res.send(e)
    }
})

router.delete('/users/me', auth, async (req,res) =>{
    const user_id = req.user._id

    try{
        // const user = await User.findByIdAndDelete(user_id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch(e){
        res.send(e)
    }
})




module.exports = router