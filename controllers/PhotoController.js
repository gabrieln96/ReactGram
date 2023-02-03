const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")

// Insert photo whit user related it
const insertPhoto = async(req, res) => {

    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    // Create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })

    // if user cread sucess
    if(!newPhoto){
        res.status(422).json({
            errors: ["Houve um problema, por favor tente novamente."]
        })
    }

    res.status(201).json(newPhoto)

    res.send("Photo insert")
}

module.exports = {
    insertPhoto,
}