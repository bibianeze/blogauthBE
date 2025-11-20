const User = require("../models/auth")
const handleError = require("../utils/handleError")


const register = async(req, res)=>{
    try {
        const user = await User.create(req.body)
        res.status(201).json({success: true, user})
    } catch (error) {
      const errors = handleError(error)
      res.status(400).json(errors)
        
    }
}

// hashing
// password: test1234-tdjhsyuey
// hashed password: whiweg3849skdhy

// salting
// we use it to generate a random string. Salting is a security technique used to protect user passwords by adding a random string (called a salt) to the password before hashing it. This makes each password hash unique—even if two users have the same password.

const login = async(req, res)=>{
   const {email, password} = req.body
   if (!email || !password) {
    return  res.status(400).json({success: false, msg: "Please provide necessary information"})
   }
   try {
    const userExists = await User.findOne({email})
    if (!userExists) {
        // return res.status(400).json({success:false, msg: "Email has not been registered"})
         throw Error("incorrect email")
    }
    const authenticated = await userExists.comparePassword(password)

    if (!authenticated) {
        // return res.status(400).json({success:false, msg: "email or password is incorrect"})
        throw Error("incorrect password")
    }
    const token = userExists.generateToken()
    res.status(200).json({
        success: true,
        user: {name: userExists.name, email: userExists.email}, token,
    })
   } catch (error) {
   const errors = handleError(error)
   res.status(400).json(errors)
   }
}

module.exports = {register, login}