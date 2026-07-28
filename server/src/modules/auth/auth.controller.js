import { registerUser } from "./auth.service.js";

export async function registerController(req,res) {
    try{
        const {name, email, password} = req.body
        const user = await registerUser(name, email, password)

        res.status(201).json({message: "User created", user})
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}

