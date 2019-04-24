const {config}= require('dotenv')
const {join} = require('path')
const {ok } = require('assert')
const env = process.env.NODE_ENV || 'dev'
ok(env==='prod' || env==='dev', 'a env é invalida')
const configpath = join(__dirname, '../../config/',`.env.${env}`)
config({
    path:configpath
})
const Hapi = require('hapi')
const Mongodb = require('../db/strategies/mongodb/mongodb')
const AlunoSchema = require('../db/strategies/mongodb/scheemas/alunoSchema')
const AlunoRoutes = require('./routes/alunosRoutes')
const Context = require('../db/strategies/base/contextStrategy')
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')
const PORT = process.env.PORT
const app = new Hapi.server({
    port:PORT
})
function mapRoutes (intance, methods){
    return methods.map(method=>intance[method]())
}

async function main(){
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection,AlunoSchema))
    const swaggerOptions = {
        info:{
            title:'Api Sistema de projeção de coeficientes -Engenharia de Software UFABC',
            version:'v1.0'
        },
        lang:'pt'
    }
    await app.register([
        Vision,
        Inert,
        {
            plugin:HapiSwagger,
            options: swaggerOptions

        }
    ])
    app.route([
        ...mapRoutes(new AlunoRoutes(context),AlunoRoutes.methods())
    ])

    await app.start()
    console.log(`rodando na porta ${PORT}`)
    return app
}
module.exports = main()