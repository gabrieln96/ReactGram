const User = require("../models/User")
 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
 
const jwtSecret = process.env.JWT_SECRET
 
// Generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    })
}
 
// Register user and sign in
const register = async (req, res) => {
    
    const {name, email, password} = req.body

    //chek if user exists
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({errors: ["Por favor, utilize outro e-mail"]})
        return
    }

    //Generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //Create User
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // If user create sucess
    if(!newUser) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde!"]})
        return
    }

    res.status(201).json ({
        _id: newUser._id,
        token: generateToken(newUser._id),
    })
}
 
//Login user
const login = async (req, res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    //check ir user exists
    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado!"]})
        return
    }

    //check if password match
    if(!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({errors: ["Senha inválida!"]})
        return
    }

    //return user with token
    res.status(201).json ({
        _id: user._id,
        profilieImage: user.profilieImage,
        token: generateToken(user._id),
    })
}

//Get current logged in user
const getCurrentUser = async (req, res) => {
    const user = req.user

    res.status(200).json(user)
}

module.exports = {
    register, 
    login,
    getCurrentUser,
}