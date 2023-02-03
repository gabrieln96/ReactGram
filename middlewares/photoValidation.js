const {body} = require("express-validator")

const photoInsertValidation = () => {
    return[
        body("title")
        .not()
        .equals("undefined")
        .withMessage("O título é obrigatório!")
        .isString()
        .withMessage("O título é obrigatório!")
        .isLength({min: 4})
        .withMessage("O título precisa de pelo menos 4 caracteres!"),
        body("image").custom((value, {req}) => {
            if(!req.file) {
                throw new Error("A imagem é obrigatória!")
            }
            return true
        })
    ]
}

module.exports = {
    photoInsertValidation,
}