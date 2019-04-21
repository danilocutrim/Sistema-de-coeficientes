const Mongoose = require('mongoose')
const coeficientesSchema = new Mongoose.Schema({
    ca:{
        type:Number,
        require:true
    },
    cp:{
        type:Number,
        require:true
    },
    cr:{
        type:Number,
        require :true
    }
})
const cursoSchema = new Mongoose.Schema({
    nomecurso:{
        type: String,
        require:true
    },
    codigocurso:{
        type:String,
        require:true
    },
    campus:{
        type:String,
        require: true
    },
    creditostotal:{
        type:Number,
        require:true
    }

})
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
const alunoSchema = new Mongoose.Schema({
    nomealuno:{
        type:String,
        require:true
    },
    ra:{
        type:Number,
        require:true,
    },
    curso:[cursoSchema],
    coeficientes:[coeficientesSchema],
    senha:{
        type:String,
        require:true
    },
    materias:[materiaSchema]
})
module.exports = Mongoose.model('alunos',alunoSchema)