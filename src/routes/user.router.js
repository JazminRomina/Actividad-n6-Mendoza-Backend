import express from 'express'
import usersModel from '../models/users.model.js'
import { createHash } from '../utils/hashbcrypt.js'

const router = express.Router()

router.post("/", async(req, res) => {
    const {first_name, last_name, email, password, age} = req.body
    let rol = 'user'

    try{
        const userExist = await usersModel.findOne({email: email})
        if(userExist){
            return res.status(400).send('There is already an account with this email.')
        }
        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
            rol = 'Admin'
        }

        const newUser = await usersModel.create({
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
            rol
        })

        req.session.user = {
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            rol: newUser.rol
        }
        req.session.login = true

        res.status(200).send("This user has been created")
    }
    catch(error){
        res.status(500).send("Error with creating the account")
    }
})

export default router