const Mongoose = require('mongoose')
const materiaSchema = new Mongoose.Schema({
        ano:{
            type: Number,
            require: true
        },
        disciplina:{
            type: String,
            require : true
        },
        categoria:{
            type: String,
            require : true
        },
        codigo:{
            type: String,
            require: true
        },
        situacao:{
            type: String,
            require: true
        },
        creditos:{
            type: Number,
            require: true
        },
        conceito:{
            type: String,
            require: true
        },
        periodo:{
            type: String,
            require: true
        }

    })
module.exports = Mongoose.model('materias',materiaSchema)
