// const { config } = require('dotenv')
// const { join } = require('path')
// const{ok} = require('assert')
const PORT = 5000

// const env = process.env.NODE_ENV || "dev"
// ok(env ==='prod'|| env==='dev', 'a env é invalida')
// const configPath =join(__dirname,'./../../config',`.env.${env}`)
// config({
//     path:configPath
// })
const Hapi = require('hapi')
const Mongodb = require('../db/strategies/mongodb/mongodb')
const AlunoSchema = require('../db/strategies/mongodb/scheemas/alunoSchema')
const AlunoRoutes = require('./routes/alunosRoutes')
const Context = require('../db/strategies/base/contextStrategy')
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')
const app = new Hapi.server({
    port:PORT
})
function mapRoutes (intance, methods){
    return methods.map(method=>intance[method]())
}

async function main(){
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection,AlunoSchema))
    app.route([
        ...mapRoutes(new AlunoRoutes(context),AlunoRoutes.methods())
    ])

    await app.start()
    console.log('rodando na porta 5000')
    return app
}
module.exports = main()