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