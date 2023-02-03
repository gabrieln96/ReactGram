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
        return
    }

    res.status(201).json(newPhoto)

    res.send("Photo insert")
}


// Remove photo
const deletePhoto = async(req, res) => {

    const {id} = req.params 

    const reqUser = req.user 

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id))

        // Check if photo exists
        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada!"]})
            return
        }
    
        // Check if photo to user
        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({ errors: ["Ocorreu um erro, tente novamente mais tarde"]})
        }
    
        await Photo.findByIdAndDelete(photo._id)
            res.status(200).json({ id: photo._id, message: "Foto excluída com sucesso!"})
    } catch (error) {
        res.status(404).json({ errors: ["Foto não encontrada!"]})
            return
    }
}

module.exports = {
    insertPhoto,
    deletePhoto,
}