const assert = require('assert')
const Mongodb = require('../db/strategies/mongodb/mongodb')
const Context = require('../db/strategies/base/contextStrategy')
const  MateriaSchema= require('../db/strategies/mongodb/scheemas/materiaschema')
const MOCK_MATERIA_CADASTRAR = {
    ano:2015,
    disciplina:'Base Experimental das Ciências Naturais',
    categoria:'Obrigatória',
    codigo:'BCS0001-13',
    situacao:'Aprovado',
    creditos:3,
    conceito:'A',
    periodo:'2'
    }

const MOCK_MATERIA_DEFAULT ={
    ano:2015,
    disciplina:`Base Experimental das Ciências Naturais-${Date.now()}`,
    categoria:'Obrigatória',
    codigo:'BCS0001-13',
    situacao:'Aprovado',
    creditos:3,
    conceito:'C',
    periodo:'2'
}

const MOCK_MATERIA_ATUALIZAR ={
    ano:2015,
    disciplina:`Base Experimental-${Date.now()}`,
    categoria:'livre',
    codigo:'BCS0001-13',
    situacao:'Aprovado',
    creditos:3,
    conceito:'C',
    periodo:'2'
}
let MOCK_MATERIA_ID = ''

let context = {}
describe('Mongodb Suite de testes mongo', function (){
    this.beforeAll(async ()=> {
        const connection = Mongodb.connect()
        context = new Context(new Mongodb(connection, MateriaSchema))
        })
    it('verificar conexão mongo', async ()=>{
        const result = await context.isConnected()
        const expected = 'conectado'

        assert.deepEqual(result,expected)
    })
    it('cadastrar mongo ', async () =>{
        const result = await context.create(MOCK_MATERIA_DEFAULT)
        const {ano,
         disciplina,
         categoria,
         codigo,
         situacao,
         creditos,
         conceito,
         periodo} = await context.create(MOCK_MATERIA_CADASTRAR)
        assert.deepEqual({ano,
         disciplina,
         categoria,
         codigo,
         situacao,
         creditos,
         conceito,
         periodo}, MOCK_MATERIA_CADASTRAR)
         MOCK_MATERIA_ID = result._id
    })
    it('listar materias', async ()=>{
        const [{ano,
        disciplina,
        categoria,
        codigo,
        situacao,
        creditos,
        conceito,
        periodo}] = await context.read({disciplina: MOCK_MATERIA_DEFAULT.disciplina})
        const result = {
             ano, disciplina, categoria, codigo, situacao, creditos, conceito, periodo
         }
        assert.deepEqual(result,MOCK_MATERIA_DEFAULT)
    })
    it('update materia', async ()=>{
        const result = await context.update(MOCK_MATERIA_ID,{
        disciplina:'fvv'
        })
        assert.deepEqual(result.nModified,1)
    })
    it('delete materia', async ()=>{
        const result = await context.delete(MOCK_MATERIA_ID)
        assert.deepEqual(result.n, 1)
    })

})

