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
    // create(){
    //     return{

    //     }
    // }
}
module.exports = AlunoRoutes