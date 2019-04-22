const assert = require('assert')
const api = require('../controllers/api')
let app = {}

describe.only('Suite te deste para rotas Dos Aluno',function(){
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
        const NAME = 'gavião negro'
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
})