import express from 'express'
import usersModel from '../models/users.model.js'
import { isValidPassword } from '../utils/hashbcrypt.js'

const router = express.Router()

router.post('/login', async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await usersModel.findOne({email: email})
        if(user){
            if(isValidPassword(password, user)){
                req.session.login = true
                req.session.user = {
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    rol: user.rol
                }
                res.redirect("/products")
            }
            else{
                res.status(401).send("The password is incorrect.")
            }
        }
        else{
            res.status(404).send("we didn't find this email.")
        }
    }
    catch(error){
        res.status(404).send("There is a problem with the server.")
    }
})

router.get("/logout", async(req, res) => {
    if(req.session.login){
        req.session.destroy()
    }
    res.redirect("/login")
})
export default router