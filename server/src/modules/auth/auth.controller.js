import { loginUser, registerUser } from "./auth.service.js";

export async function registerController(req,res) {
    try{
        const {name, email, password} = req.body
        const user = await registerUser(name, email, password)

        res.status(201).json({message: "User created", user})
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}

export async function loginController(req,res){
    try{
        const {email,password} = req.body
        const login=await loginUser(email,password)

        res.status(200).json({message:`User Logged In`,...login})
    }catch(error){
        res.status(401).json({error:error.message})
    }
}