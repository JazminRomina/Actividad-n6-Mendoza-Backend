import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    rol: {type: String}
},
{
    versionKey: false
})

const usersModel = mongoose.model("users", usersSchema)

export default usersModel