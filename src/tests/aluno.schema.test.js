const assert = require('assert')
const Mongodb = require('../db/strategies/mongodb/mongodb')
const Context = require('../db/strategies/base/contextStrategy')
const AlunoSchema = require('../db/strategies/mongodb/scheemas/alunoSchema')
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
    nomealuno:'danilo',
    ra:1121,
    senha:'12344',
    curso:[MOCK_CURSO_CADASTRAR],
    coeficientes:[MOCK_COEFICIENTES_CADASTRAR],
    materias:[MOCK_MATERIA_CADASTRAR]
}

let context = {}
describe.only('Mongo DB suite teste aluno',function(){
    this.beforeAll(async()=>{
        const connection = Mongodb.connect()
        context = new Context(new Mongodb(connection, AlunoSchema))
    })
    it('cadastrar aluno e parametros', async()=>{
        const result = await context.create(MOCK_ALUNO_CADASTRAR)
        const {
               ano,
               disciplina,
               categoria,
               codigo,
               situacao,
               creditos,
               conceito,
               periodo}= result.materias[0]

        const{
            ca,
            cp,
            cr
        } = result.coeficientes[0]

        const{
            nomecurso,
            codigocurso,
            campus,
            creditostotal
        } = result.curso[0]
        assert.deepEqual({
            ca,
            cp,
            cr
        },MOCK_ALUNO_CADASTRAR.coeficientes[0],'Coeficientes corretos')
        assert.deepEqual({
            nomecurso,
            codigocurso,
            campus,
            creditostotal
        },MOCK_ALUNO_CADASTRAR.curso[0],'Curso infos')
        assert.deepEqual({
               ano,
               disciplina,
               categoria,
               codigo,
               situacao,
               creditos,
               conceito,
               periodo
        },MOCK_ALUNO_CADASTRAR.materias[0])
        assert.deepEqual(result.nomealuno,MOCK_ALUNO_CADASTRAR.nomealuno)
        assert.deepEqual(result.ra,MOCK_ALUNO_CADASTRAR.ra)
        assert.deepEqual(result.senha,MOCK_ALUNO_CADASTRAR.senha)
    })
    console.log(MOCK_ALUNO_CADASTRAR)
})