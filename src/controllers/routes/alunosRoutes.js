const BaseRoute = require('../routes/base/baseRoute')
const Boom = require('boom')
const Joi = require('joi')
const failAction = (request, headers, error)=>{ throw error}
const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

class AlunoRoutes extends BaseRoute{
    constructor(db){
        super()
        this.db = db
    }
    list(){
        return{
            path:'/alunos',
            method:'GET',
            config:{
                description:'Deve retornar a lista com alunos ou aluno especifico atraves do skip',
                notes:'Filtrar por nome para usar no projeto',
                tags:['api'],
                validate:{
                    failAction,
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nomealuno: Joi.string().min(3).max(100)
                    }
                }
            },
            handler:(request, headers)=>{
               try{
                   const{
                       skip,
                       limit,
                       nomealuno
                   } = request.query
                   const query = nomealuno ?
                        {nomealuno:{$regex: `.*${nomealuno}*.`}} : {}

                    return this.db.read(nomealuno ?query : {}, parseInt(skip), parseInt(limit))

                } catch(error) {
                    console.log('error interno', error)
                    return Boom.unauthorized()
                }
            }
        }
    }
    createaluno(){
        return{
            path:'/alunos',
            method:'POST',
            config:{
                tags:['api']
            },
            handler: async(request)=>{
                try{
                    const{nomealuno,
                              ra,
                              senha,
                              curso,
                              coeficientes,
                              materias
                          } = request.payload
                          const result = await this.db.create({nomealuno,
                              ra,
                              senha,
                              curso,
                              coeficientes,
                              materias
                          })
                          return{
                           message:'aluno cadastrado com sucesso',
                          result
                          }

                } catch(error){
                    console.log('error interno',error)
                    return Boom.internal()

                }
            }
        }
    }
    cadastrarmateria(){
        return {
            method:'POST',
            path:'/addmateria/{id}',
            config:{
                tags:['api'],
                description:'Deve adicionar uma matéria utilizando o id do aluno',
                notes:'deve preenhcer todos os campos',
                validate:{
                    failAction,
                    params:{
                        id: Joi.string()
                    },
                    payload:{
                        ano: Joi.number().integer(),
                        categoria: Joi.string().max(100),
                        codigo:Joi.string().max(100),
                        conceito:Joi.string().max(100),
                        creditos:Joi.number().integer(),
                        disciplina:Joi.string().max(100),
                        periodo:Joi.string().max(100),
                        situacao:Joi.string().max(100)
                    }
                }
            },
            handler: async(request)=>{
                try{
                    const{id} =request.params
                    const{payload} = request
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)
                    const result = await this.db.addToArray(id,{materias:dados})
                    return{
                        message:'materia cadastrada',
                        id
                    }
                } catch(error){
                    console.log('erro interno')
                    return Boom.internal()
                }
            }
        }
    }
}
module.exports = AlunoRoutes