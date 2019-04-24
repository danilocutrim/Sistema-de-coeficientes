const assert = require('assert')
const api = require('../controllers/api')
let app = {}
const MOCK_MATERIA_CADASTRAR = {
    ano:2015,
    disciplina:'materia cadastrada pela rota',
    categoria:'Obrigatória',
    codigo:'BCS0001-13',
    situacao:'Aprovado',
    creditos:3,
    conceito:'A',
    periodo:'2'
   }
const MOCK_MATERIA_CADASTRAR_ARR = {
    ano:2015,
    disciplina:'Base Experimental das Ciências Naturais',
    categoria:'Obrigatória',
    codigo:'BCS0001-13',
    situacao:'Aprovado',
    creditos:3,
    conceito:'A',
    periodo:'2'
   }
const MOCK_COEFICIENTES_CADASTRAR = {
    ca:2,
    cp:3,
    cr:4
}
const MOCK_CURSO_CADASTRAR = {
    nomecurso:'Engenharia',
    codigocurso:'0303efd',
    campus:'sta',
    creditostotal:20
}
const MOCK_ALUNO_DEFAULT = {
    nomealuno:'rosimeire',
    ra:1114412,
    senha:'123',
    curso:[MOCK_CURSO_CADASTRAR],
    coeficientes:[MOCK_COEFICIENTES_CADASTRAR],
    materias:[MOCK_MATERIA_CADASTRAR]
}
const MOCK_ALUNO_CADASTRAR = {
    nomealuno:'cadastrado pela rota333',
    ra:1121,
    senha:'12344',
    curso:[MOCK_CURSO_CADASTRAR],
    coeficientes:[MOCK_COEFICIENTES_CADASTRAR],
    materias:[MOCK_MATERIA_CADASTRAR]
}
const MOCK_ALUNO_CADASTRAR2 = {
    nomealuno:'daniloteste',
    ra:1121,
    senha:'12344',
    curso:[],
    coeficientes:[],
    materias:[]
}

describe('Suite de teste para rotas Dos Aluno',function(){
    this.beforeAll(async()=>{
        app = await api
    })
    it('deve listar alunos do banco de dados',async()=>{
        const result = await app.inject({
            method:'GET',
            url:'/alunos?skip=0&limit=10',
        })
        const statusCode = result.statusCode
        assert.deepEqual(statusCode,200)
    })
    it('listar /alunos deve filtrar um item ' ,async ()=>{
        const TAMANHO_LIMITE = 1000
        const NAME = 'rosimeire'
        const result = await app.inject({
            method:'GET',
            url:`/alunos?skip=0&limit=${TAMANHO_LIMITE}&nomealuno=${NAME}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode,200)
        assert.deepEqual(dados[0].nomealuno, NAME)
        })
    it('listar /deve retornar  registros ' ,async ()=>{
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method:'GET',
            url:`/alunos?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode,200)
        assert.ok(dados.length== TAMANHO_LIMITE)
        })
    it('listar erro', async()=>{
        const TAMANHO_LIMITE = 'AEEE'
        const result = await app.inject({
            method:'GET',
            url:`/alunos?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = {"statusCode":400,"error":"Bad Request","message":"child \"limit\" fails because [\"limit\" must be a number]","validation":{"source":"query","keys":["limit"]}}
        assert.deepEqual(result.statusCode,400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))
    })
    it('cadastrar/ deve cadastrar um aluno pela rota',async()=>{
        const result = await app.inject({
            method:'POST',
            url:'/alunos',
            payload: JSON.stringify(MOCK_ALUNO_CADASTRAR)
        })
        assert.deepEqual(result.statusCode,200)

    })
    it('cadastrar uma materia com id do aluno',async()=>{
        const id ='5cc0755bfbe570399b04d128'
        const result = await app.inject({
            method:"POST",
            url:`/addmateria/${id}`,
            payload: JSON.stringify(MOCK_MATERIA_CADASTRAR)
        })
        console.log(result.payload)
        console.log(result.statusCode)
        assert.deepEqual(result.statusCode,200)
    })
})