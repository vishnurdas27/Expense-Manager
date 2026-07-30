import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from '../../lib/prisma.js'


export async function registerUser(name,email,password) {
    const existing =await prisma.user.findUnique({
        where: {email:email}
    }) 
    if (existing){
        throw new Error("Email Already in Use")
    }

    const passwordhash = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            email: email,
            name: name,
            passwordHash: passwordhash,
        }
    })

    const {passwordHash, ...safeUser} = newUser;
    return safeUser
} 

export async function loginUser(email,password){
    const user = await prisma.user.findUnique({
        where: {email:email}
    })
    if(!user){
        throw new Error("Invalid Credentials")
    }

    const passwordCompare=await bcrypt.compare(password,user.passwordHash)
    if(!passwordCompare){
        throw new Error("Invalid Credentials")
    }

    const token = jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn: '15m'})

    const {passwordHash, ...safeUser} = user 
    return {token, user: safeUser}
}